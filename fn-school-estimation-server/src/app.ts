import {IUser} from './IUser';
import {ICr} from './ICr';
import {CrStatus} from './CrStatus';
import {ITask} from './ITask';
import {Estimation} from './Estimation';

var express = require('express');
var jwt = require('jsonwebtoken');
var CacheClass = require('memory-cache').Cache;
var cors = require('cors');
var bodyParser = require('body-parser');

var idCounter = 5;
var crIdCounter = 7;
var taskIdCounter = 10;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var accessTokenCache = new CacheClass();
var refreshTokenCache = new CacheClass();

var users = getUserList();
var crs = getCrList();
var tasks = getTaskList();

app.use(cors());

app.get('/', function (req:any, res:any) {
  res.send('Hello World!');
});

app.get('/api/aouth/token', function (req:any, res:any) {
  var password = req.query.password;
  var login = req.query.login;
  var foundUser = users.find(user => user.name === login);
  if(!foundUser) {
    res.header('Access-Control-Allow-Origin', '*');
    res.status(401).send("Incorrerct credentials");
    return;
  }
  console.log(login);
  console.log(password);
  var access_token = jwt.sign({'login': login}, password);
  console.log(access_token);
  res.header('Access-Control-Allow-Origin', '*');
  res.send(access_token);
  accessTokenCache.put(access_token, login);
});

app.get('/api/user', function (req:any, res:any) {
  var username = accessTokenCache.get(req.header('Authorization').replace('Bearer ', ''));
  var foundUser = users.find(user => user.name === username);
  res.header('Access-Control-Allow-Origin', '*');
  res.send(foundUser);
});

app.get('/api/user_list', function (req:any, res:any) {
  res.send(users);
});

app.get('/api/cr/:crId/tasks', function (req:any, res:any) {
  var crId = req.params.crId;
  console.log(crId);
  
  res.header('Access-Control-Allow-Origin', '*');
  res.send(tasks.filter(t => t.crId === crId));
});

app.delete('/api/task/:taskId', function (req:any, res:any) {
  var taskId = req.params.taskId;
  
  let index = tasks.map(t => t.id).indexOf(taskId);
  if(index > -1) {
    tasks.splice(index, 1);
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.send("Task deleted");
});

app.post('/api/task/:taskId/estimate', function (req:any, res:any) {
  var taskId = req.params.taskId;
  console.log(taskId);
  
  if(!tasks.map(t => t.id).includes(taskId)) {
    res.send("Task not found");
    return;
  }
  var username = accessTokenCache.get(req.header('Authorization').replace('Bearer ', ''));
  var foundUser = users.find(user => user.name === username) as IUser;
  if(!foundUser) {
    res.send("User not found");
    return;
  }

  let task = tasks.filter(t => t.id == taskId)[0];
  if(task.estimationList.map(e => e.userId).includes(foundUser.id)) {
    // estimation exist
    task.estimationList.filter(e => e.userId === foundUser.id)[0].value = req.body.body.estimation;
  } else {
    let newEstimation = {
      userId: foundUser.id,
      value: req.body.body.estimation,
    } as Estimation;

    task.estimationList.push(newEstimation);
  }

  if(task.estimationList.length > 1 ) {
    let cr = crs.filter(cr => cr.id == task.crId)[0];
    let allOk = tasks.filter(t => t.crId == task.crId).every(t => t.estimationList.length > 1)
    if(allOk && !!cr && cr.status === CrStatus.Assigned) {
      cr.status = CrStatus.WaitForMerge;
    }
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.send("Task estimated");
});

app.post('/api/task/:taskId/merge_estimation', function (req:any, res:any) {
  var taskId = req.params.taskId;
  console.log(taskId);
  
  if(!tasks.map(t => t.id).includes(taskId)) {
    res.send("Task not found");
    return;
  }

  let task = tasks.filter(t => t.id == taskId)[0];
  task.mergedEstimation = req.body.body.estimation;

  if(!!task.mergedEstimation) {
    let cr = crs.filter(cr => cr.id == task.crId)[0];
    let allOk = tasks.filter(t => t.crId == task.crId).every(t => !!t.mergedEstimation)
    if(allOk && !!cr && cr.status === CrStatus.WaitForMerge) {
      cr.status = CrStatus.Merged;
    }
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.send("Task estimated");
});

app.put('/api/cr/:crId/assignee', function (req:any, res:any) {
  var crId = req.params.crId;
  console.log(req.body.body);
  let cr = crs.filter(cr => cr.id == crId)[0];
  if(!!cr) {
    cr.assigned = req.body.body;
    if(req.body.body.length > 1 && cr.status === CrStatus.Approved) {
      cr.status = CrStatus.Assigned;
    } else if(req.body.body.length < 2 && cr.status === CrStatus.Assigned) {
      cr.status = CrStatus.Approved;
    }
  }
  
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Assignee list updated for CR: ' + crId);
});

app.get('/api/cr', function (req:any, res:any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(crs);
});

app.post('/api/signup', function (req:any, res:any) {
  console.log(req.body.body.login);
  let newUser = {
    id: idCounter + '',
    name: req.body.body.login,
    roles: ['worker']
  } as IUser;
  
  idCounter = idCounter + 1;  
  users.push(newUser);
  
  res.header('Access-Control-Allow-Origin', '*');
  res.send('User created');
});

app.post('/api/add_cr', function (req:any, res:any) {
  var username = accessTokenCache.get(req.header('Authorization').replace('Bearer ', ''));
  
  var foundUser = users.find(user => user.name === username) as IUser;

  let projectId = crs.filter(cr => cr.project.name === req.body.body.project.name).map(cr => cr.project.id) + '';
  let newCr = {
    id: crIdCounter + '',
    title: req.body.body.title,
    status: CrStatus.WaitForApprove,
    project: {
      id: projectId,
      name: req.body.body.project.name,
      version: req.body.body.project.version,
    },
    owner: {
      id: foundUser.id,
      name: foundUser.name,
    },
    created_at: new Date(),
    assigned: [],
  } as ICr;

  crs.push(newCr);

  let newTask = {
    id: taskIdCounter + '',
    crId: crIdCounter + '',
    title: req.body.body.task.title,
    description: req.body.body.task.description,
    estimationList: [],
  } as ITask;
  
  tasks.push(newTask);
  

  taskIdCounter = taskIdCounter + 1;
  crIdCounter = crIdCounter + 1;  
  res.header('Access-Control-Allow-Origin', '*');
  res.send('CR created');
});

app.post('/api/add_task', function (req:any, res:any) {

  let newTask = {
    id: taskIdCounter + '',
    crId: req.body.body.cr_id,
    title: req.body.body.title,
    description: req.body.body.description,
    estimationList: [],
  } as ITask;

  tasks.push(newTask);
  taskIdCounter = taskIdCounter + 1;

  res.header('Access-Control-Allow-Origin', '*');
  res.send('Task created');
});

app.use('/images', express.static('images'));

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});

app.patch('/api/cr/:crId/close', function (req:any, res:any) {
  var crId = req.params.crId;
  
  let cr = crs.filter(cr => cr.id === crId); 
  if(!!cr[0]) {
    cr[0].status = CrStatus.Closed;
  }

  res.send('CR closed');
});

app.patch('/api/cr/:crId/approve', function (req:any, res:any) {
  var crId = req.params.crId;
  
  let cr = crs.filter(cr => cr.id === crId); 
  if(!!cr[0]) {
    cr[0].status = CrStatus.Approved;
  }

  res.send('CR approved');
});

app.patch('/api/cr/:crId/reject', function (req:any, res:any) {
  var crId = req.params.crId;
  
  let cr = crs.filter(cr => cr.id === crId); 
  if(!!cr[0]) {
    cr[0].status = CrStatus.Rejected;
  }

  res.send('CR rejected');
});

function getUserList() : Array<IUser> {
  return [
    {
      id: '0',
      name: 'zzz',
      roles: ['architect']
    },
    {
      id: '1',
      name: 'aaa',
      roles: ['architect']
    },
    {
      id: '2',
      name: 'bbb',
      roles: ['manager']
    },
    {
      id: '3',
      name: 'ccc',
      roles: ['worker']
    },
    {
      id: '4',
      name: 'ddd',
      roles: ['worker']
    },
  ];
};

function getTaskList() : Array<ITask> {
  return [
    {
      id: '1',
      crId: '1',
      title: 'Task 1 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '7',
      crId: '1',
      title: 'Task 7 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '8',
      crId: '1',
      title: 'Task 8 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '2',
      crId: '2',
      title: 'Task 3 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '3',
      crId: '3',
      title: 'Task 3 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '4',
      crId: '4',
      title: 'Task 4 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '5',
      crId: '5',
      title: 'Task 5 title',
      description: 'Some description',
      estimationList: [],
    },
    {
      id: '6',
      crId: '6',
      title: 'Task 6 title',
      description: 'Some description',
      estimationList: [],
    }
  ]
}

function getCrList() : Array<ICr> {
  return [
    {
      id: "1",
      title: "Test change 1",
      status: CrStatus.WaitForApprove,
      project: {
        id: "1",
        name: "Project 1",
        version: "1.0.1",
      },
      owner: {
        id: "1",
        name: "aaa"
      },
      created_at: new Date("2018-03-16"),
      assigned: []
    },
    {
      id: "2",
      title: "Test change 2",
      status: CrStatus.Approved,
      project: {
        id: "1",
        name: "Project 1",
        version: "1.0.1",
      },
      owner: {
        id: "1",
        name: "aaa"
      },
      created_at: new Date("2018-03-17"),
      assigned: []
    },
    {
      id: "3",
      title: "Test change 3",
      status: CrStatus.Assigned,
      project: {
        id: "2",
        name: "Project 2",
        version: "1.0.1",
      },
      owner: {
        id: "0",
        name: "zzz"
      },
      created_at: new Date("2018-03-18"),
      assigned: [
        {
          id: '3',
          name: 'ccc'
        },
        {
          id: '4',
          name: 'ddd'
        }
      ]
    },
    {
      id: "4",
      title: "Test change 4",
      status: CrStatus.WaitForMerge,
      project: {
        id: "2",
        name: "Project 2",
        version: "1.0.1",
      },
      owner: {
        id: "0",
        name: "zzz"
      },
      created_at: new Date("2018-03-18"),
      assigned: [
        {
          id: '3',
          name: 'ccc'
        },
        {
          id: '4',
          name: 'ddd'
        }
      ]
    },
    {
      id: "5",
      title: "Test change 5",
      status: CrStatus.Merged,
      project: {
        id: "2",
        name: "Project 2",
        version: "1.0.1",
      },
      owner: {
        id: "0",
        name: "zzz"
      },
      created_at: new Date("2018-03-18"),
      assigned: [
        {
          id: '3',
          name: 'ccc'
        },
        {
          id: '4',
          name: 'ddd'
        }
      ]
    },
    {
      id: "6",
      title: "Test change 6",
      status: CrStatus.Closed,
      project: {
        id: "2",
        name: "Project 2",
        version: "1.0.1",
      },
      owner: {
        id: "0",
        name: "zzz"
      },
      created_at: new Date("2018-03-18"),
      assigned: [
        {
          id: '3',
          name: 'ccc'
        },
        {
          id: '4',
          name: 'ddd'
        }
      ]
    }
  ];
};