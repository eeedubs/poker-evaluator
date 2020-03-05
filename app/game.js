const River = require('./river');
const Hand = require('./hand');
const Deck = require('./deck');
const Card = require('./card');

module.exports = class Game {
  constructor() {
    this.deck = new Deck();
    this.hands = [];
  }

  play(numberOfPlayers){
    this._deal(numberOfPlayers);
    this.hands.forEach((hand) => {
      hand.evaluateHandPossibilities();
    });
    this.determineWinner();
  }

  _deal(numberOfPlayers){
    this._dealCards(numberOfPlayers);
    this._dealRiver();
  }

  _dealCards(numberOfPlayers){
    // Create a hand for each player in the game.
    for (let x = 0; x < numberOfPlayers; x++){
      this.hands.push(new Hand(this.deck));
    }

    // Deal a card to each player, in sequence, twice.
    for (let round = 0; round < 2; round++){
      for (let turn = 0; turn < numberOfPlayers; turn++){
        let newCard = new Card;
        newCard.drawRandom(this.deck);
        this.hands[turn].cards[round] = newCard;
      }
    }
  }

  _dealRiver(){
    // Deal the river and burn cards
    this.river = new River(this.deck);
    for (let hand of this.hands){
      hand.setRiver(this.river);
      hand.removeDeck();
    }
  }

  determineWinner(){
    let winner;
    for (let hand of this.hands){
      if (!winner){ 
        winner = hand ;
      }
      if (hand.handValue > winner.handValue){
        winner = hand;
      }
    }
    let winnerIndex = this.hands.indexOf(winner);
    let losers = this.hands.filter((hand, index) => { return index !== winnerIndex });
    // console.log("WINNER:");
    // console.log(winner.bestFive, winner.highestHand);
    // console.log();
    // console.log("LOSERS:");
    // losers.forEach((loser) => {
    //   console.log(loser.bestFive, loser.highestHand);
    // });
  }
}
