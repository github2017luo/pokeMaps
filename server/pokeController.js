var auth = require('./authController.js');

var api = {};

api.login = function(req, res){
  auth.login();
  res.send('login done!');
}

module.exports = api;
