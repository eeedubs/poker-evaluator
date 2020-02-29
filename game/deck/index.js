const Card = require('../card/index.js');

module.exports = class Deck {
  constructor(source) {
    this.cards = this._fillDeck(source);
  }

  _fillDeck(source) {
    let deck = [];
    let lines = source.split(",\n");
    for (let line of lines){
      let parsedLine = JSON.parse(line);
      let number = parsedLine["Number"];
      let suite = parsedLine["Suite"];
      let newCard = new Card();
      newCard.setValues(number, suite);
      deck.push(newCard);
    }
    return deck;
  }
}