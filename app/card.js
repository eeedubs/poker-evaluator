module.exports = class Card {
  constructor(number = null, suite = null) {
    this.number = number;
    this.suite = suite;
  }
  
  drawRandom(deck) {
    let cardIndex = Math.floor(Math.random() * deck.cards.length);
    let card = deck.cards.splice(cardIndex, 1)[0];
    this.number = card.number;
    this.suite = card.suite;
  }
}