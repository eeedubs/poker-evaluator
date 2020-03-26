const { assert } = require('chai');
const { Deck, Card } = require('./index');

describe('#Deck()', () => {
  it('it creates a 52-card deck, comprised of 1-13 numbers for 4 suites', () => {
    const suites = ['Diamonds', 'Clubs', 'Hearts', 'Spades']
    let deck = new Deck()
    
    assert.isObject(deck, 'the deck is an object')
    assert.equal(deck.cards.length, 52, 'the deck is 52 cards long');

    for (let suite of suites){
      for (let i = 1; i <= 13; i++){
        assert.deepInclude(deck.cards, new Card(i, suite), `deck contains the ${i} of ${suite}`);
      }
    } 
  });
});