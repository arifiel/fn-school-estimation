import {IUser} from './IUser';
import {ICr} from './ICr';
import {CrStatus} from './CrStatus';
import {ITask} from './ITask';

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

app.get('/api/cr/:crId/tasks/', function (req:any, res:any) {
  var crId = req.params.crId;
  console.log(crId);
  
  res.header('Access-Control-Allow-Origin', '*');
  res.send(tasks.filter(t => t.crId === crId));
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
  var username = accessTokenCache.get(req.body.headers.Authorization.replace('Bearer ', ''));
  
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
  } as ITask;
  
  tasks.push(newTask);
  

  taskIdCounter = taskIdCounter + 1;
  crIdCounter = crIdCounter + 1;  
  res.header('Access-Control-Allow-Origin', '*');
  res.send('CR created');
});

app.post('/api/add_task', function (req:any, res:any) {


  res.header('Access-Control-Allow-Origin', '*');
  res.send('Task created');
});

app.use('/images', express.static('images'));

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
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
    },
    {
      id: '7',
      crId: '1',
      title: 'Task 7 title',
      description: 'Some description',
    },
    {
      id: '8',
      crId: '1',
      title: 'Task 8 title',
      description: 'Some description',
    },
    {
      id: '2',
      crId: '2',
      title: 'Task 3 title',
      description: 'Some description',
    },
    {
      id: '3',
      crId: '3',
      title: 'Task 3 title',
      description: 'Some description',
    },
    {
      id: '4',
      crId: '4',
      title: 'Task 4 title',
      description: 'Some description',
    },
    {
      id: '5',
      crId: '5',
      title: 'Task 5 title',
      description: 'Some description',
    },
    {
      id: '6',
      crId: '6',
      title: 'Task 6 title',
      description: 'Some description',
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