const Card = require('../card/index');

module.exports = class River {
  constructor(deck) {
    [this.cards, this.burnPile] = this._dealDeck(deck);
  }

  _dealDeck(deck) {
    let cards = [];
    let burnPile = [];
    for (let i = 0; i < 8; i++){
      let newCard = new Card();
      newCard.drawRandom(deck);
      if ([0, 4, 6].includes(i)){
        burnPile.push(newCard);
      } else {
        cards.push(newCard);
      }
    }
    return [cards, burnPile];
  }
}