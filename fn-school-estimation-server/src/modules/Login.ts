import {IUser} from '../IUser';
var jwt = require('jsonwebtoken');

class Login {
  static accessTokenCache: any;
  static users: Array<IUser>;

  static login(req:any, res:any) {
    var password = req.query.password;
    var login = req.query.login;
		var foundUser = Login.users.find(user => user.name === login);
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
  	Login.accessTokenCache.put(access_token, login);
	}
};

module.exports = Login;