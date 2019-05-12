import {IUser} from '../IUser';
var jwt = require('jsonwebtoken');

class User {
  static accessTokenCache: any;
  static users: Array<IUser>;

  static getUser(req:any, res:any) {
    var username = User.accessTokenCache.get(req.header('Authorization').replace('Bearer ', ''));
  	var foundUser = (User.users as Array<IUser>).find(user => user.name === username);
  	res.header('Access-Control-Allow-Origin', '*');
  	res.send(foundUser);
	}

	static getUserList(req:any, res:any) {
    res.send(User.users);
	}
};

User.users = getUserList();

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

module.exports = User;