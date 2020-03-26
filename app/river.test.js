const { assert } = require('chai');
const { River, Deck, Card } = require('./index');

describe('#River()', () => {
  it('it creates a 5-card river and a 3-card burn pile', () => {
    let deck = new Deck();
    let river = new River(deck);
    
    assert.isObject(river, 'the river is an object')
    assert.equal(river.cards.length, 5, 'the river is 5-cards long');
    for (let card of river.cards){
      assert.isObject(card, 'each river card is an object');
      assert.isNumber(card.number, 'each river card number is a Number');
      assert.isString(card.suite, 'each river card suite is a String');
    }
    assert.equal(river.burnPile.length, 3, 'the burn pile is 3-cards long');
    for (let card of river.burnPile){
      assert.isObject(card, 'each burn card is an object');
      assert.isNumber(card.number, 'each burn card number is a Number');
      assert.isString(card.suite, 'each burn card suite is a String');
    }
  });
});