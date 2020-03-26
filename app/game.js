const River           = require('./river');
const Hand            = require('./hand');
const Deck            = require('./deck');
const Card            = require('./card');
const comparePickFive = require('./comparators/comparePickFive');

module.exports = class Game {
  constructor(numberOfPlayers = 2, isATest = true) {
    this.deck = new Deck();
    this.hands = new Array(numberOfPlayers);
    this.isATest = isATest;
  }

  play(){
    if (this.hands.length > 22){ 
      console.log("You cannot play with more than 22 players.");
      return;
    } else if (this.hands.length < 1){
      console.log("You must play with at least 1 player.");
      return;
    }

    this._deal();
    this._determineWinner();
    this._printResult();
  }

  _deal(){
    this._dealCardsToEachPlayer();
    this._dealRiver();
    this._evaluateHandOutcomes();
  }

  _dealCardsToEachPlayer(){
    // Create a hand for each player in the game.
    for (let x = 0; x < this.hands.length; x++){
      this.hands[x] = new Hand(this.deck);
    }

    // Deal a card to each player, in sequence, twice.
    for (let round = 0; round < 2; round++){
      for (let turn = 0; turn < this.hands.length; turn++){
        let newCard = new Card();
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
    }
  }

  _evaluateHandOutcomes(){
    this.hands.forEach((hand) => {
      hand.evaluateHandOutcomes();
    });
  }

  _determineWinner(){
    let possibleWinners   = [];
    let highestHandValue  = -1;
    // Gather the possible winners by hand strength
    this.hands.forEach((hand) => {
      if (hand.handValue > highestHandValue) {
        highestHandValue = hand.handValue;
        possibleWinners = [hand];
      } else if (hand.handValue === highestHandValue){
        possibleWinners.push(hand);
      }
    });

    this.winners  = comparePickFive(possibleWinners);
    this.losers   = this.hands.filter(h => !this.winners.includes(h))

  }
  
  _printResult(){
    if (this.isATest){ return };
    if (!this.winners && !this.losers){
      console.log("No winners or losers found");
      return;
    }

    let straightLine = `\n------------------------------------------------\n`;
    console.log(straightLine, `\nRIVER:\n\n`, this.river.cards, '\n', straightLine, `\nWINNERS:\n`)
    for (let winner of this.winners){
      console.log(winner.bestFiveCards, winner.highestHand);
      console.log()
    }
    console.log(straightLine, `\nLOSERS:\n`)
    for (let loser of this.losers){
      console.log(loser.bestFiveCards, loser.highestHand);
      console.log()
    }
    console.log(straightLine);
  };
}
