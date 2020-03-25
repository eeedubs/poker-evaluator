const River           = require('./river');
const Hand            = require('./hand');
const Deck            = require('./deck');
const Card            = require('./card');
const comparePickFive = require('./comparators/comparePickFive');

module.exports = class Game {
  constructor(numberOfPlayers) {
    this.deck = new Deck();
    this.hands = new Array(numberOfPlayers);
  }

  play(){
    this._deal();
    this.determineWinner();
  }

  _deal(){
    this._dealCardsToEachPlayer();
    this._dealRiver();
    this._evaluateOutcomes();
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

  _evaluateOutcomes(){
    this.hands.forEach((hand) => {
      hand.evaluateHandOutcomes();
    });
  }

  determineWinner(){
    let possibleWinners   = [];
    let winners           = [];
    let losers            = [];
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

    if (possibleWinners.length > 1){
      let pokerHandType = possibleWinners[0].highestHand;
      winners = comparePickFive(possibleWinners);
      losers = this.hands.filter(h => !winners.includes(h));
    } else {
      let winnerIndex = this.hands.indexOf(possibleWinners[0]);
      winners = possibleWinners;
      losers = this.hands.filter((h, index) => { return index !== winnerIndex });
    }

    console.log("WINNERS:");
    winners.forEach((winner) => {
      console.log(winner.bestFiveCards, winner.highestHand);
    });
    console.log();
    console.log("LOSERS:");
    losers.forEach((loser) => {
      console.log(loser.bestFiveCards, loser.highestHand);
    });
  }
}
