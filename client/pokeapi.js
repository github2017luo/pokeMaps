

var data;

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: api_url,
    headers: headers
  });

});
