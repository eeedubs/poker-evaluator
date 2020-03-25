const fs              = require('fs');
const pokerHandFile   = fs.readFileSync('app/assets/pokerHands.txt', 'utf8')
const equators        = require('./equators/index');
const helperMethods   = require('./helpers/index') 

module.exports = class Hand {
  constructor(deck, cards = new Array(2)) {
    this.deck = deck; // the 52 cards
    this.cards = cards; // the 2 cards in-hand
  }

  get comboNumbers(){
    if (!this.combo){ return [] };
    return this.combo.map(card => card.number).sort((a, b) => { return a - b });
  }

  get comboSuites() {
    if (!this.combo){ return [] };
    return this.combo.map(card => card.suite).sort();
  }

  get bestFiveNumbers(){
    if (!this.bestFiveCards){ return [] };
    return this.bestFiveCards.map(card => card.number).sort((a, b) => { return a - b });
  }

  get bestFiveSuites(){
    if (!this.bestFiveCards){ return [] };
    return this.bestFiveCards.map(card => card.suite).sort();
  }

  get highCardNumberValue() {
    return (this.comboNumbers[0] === 1) ? 1 : this.comboNumbers[6]
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

  evaluateHandOutcomes(){
    this.highCardNumber  = this.highCardNumberValue;
    this.highCardSuite   = this.highCardSuiteValue;
    let equatorFunctions = Object.keys(equators);

    // RF, SF, 4K, FH,FL, ST, 3K, 2P, P, HC
    for (let func of equatorFunctions){
      let response = equators[func](this);
      if (response.pokerHand){
        this.bestFiveCards = response.pokerHand;
        this.highestHand = response.highestHand;
        this.handValue = this.pokerHandStrength;
        return;
      }
    }
  }
}