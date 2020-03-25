const fs = require('fs');
const sequences = fs.readFileSync('app/assets/sequences.txt', 'utf8')
const suiteValues = JSON.parse(sequences)["suites"];
const numberValues = JSON.parse(sequences)["numbers"];

module.exports = class Card {
  constructor(number = null, suite = null) {
    if (numberValues.includes(number) && suiteValues.includes(suite)){
      this.number = number;
      this.suite = suite;
    } else {
      this.number = null;
      this.suite = null;
    }
  }
  
  drawRandom(deck) {
    if (this.number || this.suite){ return };
    let cardIndex = Math.floor(Math.random() * deck.cards.length);
    let card = deck.cards.splice(cardIndex, 1)[0];
    this.number = card.number;
    this.suite = card.suite;
  }
}