var pokeController = require('./pokeController.js');

module.exports = function(router){
  router.get('/pokemon', pokeController.testPokemon);
}
