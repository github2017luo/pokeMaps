var api = {};
var http = require('http');
var https = require('https');
var fs = require('fs');
var util = require('util');
var request = require('request');

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oath = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

var headers = {
  'User-Agent': 'Niantic App'
}



api.login = function(req, res){
  request(login_url, (err, response, body)=>{
    if(err){
      console.log(err);
    }
    body = JSON.parse(body);
    console.log(body);
      console.log(body.lt);
      console.log(body.execution);

  });
}









module.exports = api;
