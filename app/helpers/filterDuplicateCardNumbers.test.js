const chai                          = require('chai');
const assert                        = chai.assert
const { Card }                      = require('../index');
const filterDuplicateCardNumbers      = require('./filterDuplicateCardNumbers');

describe('#filterDuplicateCardNumbers()', () => {
  it('returns exactly 5 cards when fed a 5-card straight with no duplicates', () => {
    let cards = [
      new Card(1, 'Diamonds'),
      new Card(13, 'Spades'),
      new Card(12, 'Diamonds'),
      new Card(11, 'Spades'),
      new Card(10, 'Diamonds')
    ]
    let expectedOutcome = cards;

    let result = filterDuplicateCardNumbers(cards);
    assert.isArray(result, 'the return value is an array');
    assert.equal(result.length, 5, 'the function returns 5 cards');
    assert.deepEqual(result, expectedOutcome, 'the function returns the cards');
  });
  
  
  it('returns exactly 5 cards when fed a 5-card straight with 5 duplicates', () => {
    let cards = [
      new Card(1, 'Diamonds'),
      new Card(1, 'Clubs'),
      new Card(13, 'Spades'),
      new Card(13, 'Hearts'),
      new Card(12, 'Diamonds'),
      new Card(12, 'Hearts'),
      new Card(11, 'Spades'),
      new Card(11, 'Clubs'),
      new Card(10, 'Diamonds'),
      new Card(10, 'Spades')
    ]

    let expectedOutcome = [cards[1], cards[2], cards[5], cards[6], cards[9]]

    let result = filterDuplicateCardNumbers(cards);
    assert.isArray(result, 'the return value is an array');
    assert.equal(result.length, 5, 'the function returns 5 cards');
    assert.deepEqual(result, expectedOutcome, 'the function returns the cards');
  });
});
