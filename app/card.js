module.exports = class Card {
  constructor(number = null, suite = null) {
    const isValidNumber = (typeof number === 'number' && (number.toFixed() >= 1 && number.toFixed() <= 13))
    const isValidSuite = (typeof suite === 'string' && ['Diamonds', 'Clubs', 'Hearts', 'Spades'].includes(suite))
    if (isValidNumber && isValidSuite){
      this.number = number;
      this.suite = suite;
      return
    }
    this.number = null;
    this.suite = null;
  }
  
  drawRandom(deck) {
    if (this.number || this.suite){ return };
    let cardIndex = Math.floor(Math.random() * deck.cards.length);
    let card = deck.cards.splice(cardIndex, 1)[0];
    this.number = card.number;
    this.suite = card.suite;
  }
}