var api = {};

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oath = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

var headers = {
  'User-Agent': 'Niantic App'
}

api.testPokemon = function(req, res){
  http.get(api_url, (res) => {
    console.log(`Got response: ${res.statusCode}`);
    consoe.log(`and the text: ${res}`);
    //res.resume();
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
}











module.exports = api;
