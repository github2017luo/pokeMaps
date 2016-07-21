var api = {};
var http = require('http');
var https = require('https');
var fs = require('fs');
var util = require('util');

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oath = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

var headers = {
  'User-Agent': 'Niantic App'
}

api.testPokemon = function(req, res){
  https.get(api_url, (response) => {
    console.log(`Got response: ${response.statusCode}`);
    console.log('and the text: ', response);
    //res.resume();
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}

api.login = function(req, res){
  https.request({
    method: 'GET',
    hostname: 'sso.pokemon.com',
    headers: headers,
    path: '/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize'
  }, (response)=>{
    var arr = Object.keys(response);

    console.log('we got back this', arr);
    fs.writeFile('response.txt', util.inspect(response), 'utf8', function(){
      console.log('done writing');
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  }).on('end', ()=>{
    console.log("request ended");
  }).end();
}









module.exports = api;
