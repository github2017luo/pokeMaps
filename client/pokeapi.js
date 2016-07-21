
//
// var data;
//
// $(document).ready(function(){
//
//   $.ajax({
//     method: 'GET',
//     url: api_url,
//     headers: headers
//   });
//
// });

function testPokemon(){
  $.ajax({
    method: 'GET',
    url: 'api/pokemon'
  });
}
