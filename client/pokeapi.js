var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oath = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

headers = {
  'User-Agent': 'Niantic App'
}

var data;

$(document).ready(function(){
  $.ajax({
    method: 'GET',
    url: api_url,
    headers: headers
  });
});
