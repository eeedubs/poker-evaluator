const fs = require('fs');
const Card = require('./card');
const cardFile = fs.readFileSync('app/assets/cards.txt', 'utf8')

module.exports = class Deck {
  constructor() {
    this.cards = this._fillDeck(cardFile);
  }

  _fillDeck(source) {
    let deck = [];
    let lines = source.split(",\n");
    for (let line of lines){
      let parsedLine = JSON.parse(line);
      let number = parsedLine["Number"];
      let suite = parsedLine["Suite"];
      let newCard = new Card(number, suite);
      deck.push(newCard);
    }
    return deck;
  }
}