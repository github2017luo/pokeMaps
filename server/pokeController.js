var api = {};
var http = require('http');
var https = require('https');
var fs = require('fs');
var util = require('util');
var request = require('request');
var url = require('url');
var player = require('./player.js');

var ProtoBuf = require('protobufjs');

var builder = ProtoBuf.loadProtoFile(__dirname + '/pokemon.proto');


var pokemonProto = builder.build();

var RequestEnvelop = pokemonProto.RequestEnvelop;
var ResponseEnvelop = pokemonProto.ResponseEnvelop;




var j = request.jar();
request = request.defaults({ jar: j });


var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oauth = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

api.login = function(req, res){
  getToken((token)=>{
    getEndpoint(token);
  });
}
function getToken(cb){
  var options = {
      url: login_url,
      headers: {
          'User-Agent': 'niantic'
      }
  };

  request.get(options, (err, response, body) =>{
      var data;

      if (err) {
          return callback(err, null);
      }

      body = JSON.parse(body);

      options = {
          url: login_url,
          form: {
              'lt': body.lt,
              'execution': body.execution,
              '_eventId': 'submit',
              'username': 'rogersjcaleb',
              'password': 'workhard'
          },
          headers: {
              'User-Agent': 'niantic'
          }
      };

      request.post(options, function (err, response, body) {
          if(err) {
            console.log("Error in third request", err);
          }

          console.log('response status is', response.statusMessage);
          console.log('ticket is', response.headers['location']);

          var ticket = response.headers['location'].split('ticket=')[1];
          console.log('what ticket actually is', ticket);

          options = {
              url: login_oauth,
              form: {
                  'client_id': 'mobile-app_pokemon-go',
                  'redirect_uri': 'https://www.nianticlabs.com/pokemongo/error',
                  'client_secret': 'w8ScCUXJQc6kXKw8FiOhd8Fixzht18Dq3PEVkUCP5ZPxtgyWsbTvWHFLm2wNY0JR',
                  'grant_type': 'refresh_token',
                  'code': ticket
              },
              headers: {
                  'User-Agent': 'niantic'
              }
          };

          request.post(options, function (err, response, body) {
              var token;

              if(err) {
                  console.log('error in third request', err);
              }

              token = body.split('token=')[1];
              token = token.split('&')[0];
              player.token = token;
              cb(token);

          });
      });
  });
}

function getEndpoint(token){
  var authObj = new RequestEnvelop.AuthInfo({
      provider: 'ptc',
      token: new RequestEnvelop.AuthInfo.JWT(token, 59)
  });
  var reqEnvs = [new RequestEnvelop.Requests(2), new RequestEnvelop.Requests(126), new RequestEnvelop.Requests(4), new RequestEnvelop.Requests(129), new RequestEnvelop.Requests(5)];

  var reqDump = new RequestEnvelop({
      unknown1: 2,
      unknown12: 989,
      rpc_id: 1469378659230941192,
      auth: authObj,
      requests: reqEnvs,
      latitude: player.latitude,
      longitude: player.longitude,
      altitude: player.altitude,
  });

  var buffMe = reqDump.encode().toBuffer();

  var opt = {
    body: buffMe,
    url: api_url,
    encoding: null,
    headers: {
      'User-Agent':'Niantic App'
    }
  };

  request.post(opt, (err, response, body)=>{
    console.log("response code", response.statusMessage);
    if (response === undefined || body === undefined) {
        console.log('[something wrong with get api');
    }

    try {
        var decodedResponse = ResponseEnvelop.decode(body);
    } catch (e) {
        if (e.decoded) {
            // Truncated
            console.warn(e);
            decodedResponse = e.decoded; // Decoded message with missing required fields
        }
    }

    if (decodedResponse) {
      var api_endpoint = 'https://' + decodedResponse.api_url + '/rpc';
      console.log('api endpoint', api_endpoint);
      player.api = api_endpoint;
    } else {
        api_req(api_endpoint, access_token, req, callback);
    }

  });

}









module.exports = api;
