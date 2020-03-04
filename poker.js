const Game = require('./app/game');

let game = new Game();
game.play(1);
// while (!game.hands[0].isRoyalFlush){
//   game = new Game();
//   game.play(1);
// }
console.log(game.hands[0]);