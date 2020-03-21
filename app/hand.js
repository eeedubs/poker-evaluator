const fs = require('fs');
const pokerHandFile = fs.readFileSync('app/assets/pokerHands.txt', 'utf8')
const equatorMethods  = require('./equators/index');
const helperMethods   = require('./equators/helpers/index') 

module.exports = class Hand {
  constructor(deck, cards = new Array(2)) {
    this.deck = deck; // the 52 cards
    this.cards = cards; // the 2 cards in-hand
  }

  get cardNumbers(){
    return this.combo.map((card) => { return card.number }).sort((a, b) => { return a - b });
  }

  get cardSuites() {
    return this.combo.map((card) => { return card.suite }).sort();
  }

  get highCardNumberValue() {
    return (this.cardNumbers[0] === 1) ? 1 : this.cardNumbers[6]
  }

  get highCardSuiteValue() {
    let highCardNumberValue = this.highCardNumberValue;
    let highCards = this.combo.filter((card) => { return card.number === highCardNumberValue });
    return helperMethods.getHighestCardAmongstDuplicateNumbers(highCards, 1)[0].suite
  }

  get pokerHandStrength() {
    let lines = pokerHandFile.split(",\n");
    for (let line of lines){
      let parsedLine = JSON.parse(line);
      if (parsedLine["Hand"] === this.highestHand){ 
        return parsedLine["Strength"];
      }
    }
  }

  setRiver(river){ 
    this.river = river;
    this._setCombo(this.river.cards, this.cards);
  }

  _setCombo(riverCards, cards){
    this.combo = riverCards.concat(cards);
  }

  removeDeck(){
    this.deck = [];
  }

  evaluateHandPossibilities(){
    this.highCardNumber  = this.highCardNumberValue;
    this.highCardSuite   = this.highCardSuiteValue;
    let equatorFunctions = Object.keys(equatorMethods);

    // RF, SF, 4K, FH,FL, ST, 3K, 2P, P, HC
    for (let func of equatorFunctions){
      let response = equatorMethods[func](this);
      if (response.pokerHand){
        this.bestFive     = response.pokerHand;
        this.highestHand  = response.highestHand;
        break;
      }
    }

    this.handValue = this.pokerHandStrength;
  }
}