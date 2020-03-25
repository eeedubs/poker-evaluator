const chai                  = require('chai');
const assert                = chai.assert
const { Card }  = require('../index');
const sortHighToLow        = require('./sortHighToLow');

describe('#sortHighToLow()', () => {
  it('sorts the cards from highest to lowest value', () => {
    let unsortedCards = [
      new Card(13, 'Spades'),
      new Card(4, 'Hearts'),
      new Card(11, 'Spades'),
      new Card(7, 'Clubs'),
      new Card(9, 'Spades'),
      new Card(11, 'Diamonds'),
      new Card(5, 'Clubs'),
      new Card(7, 'Diamonds'),
      new Card(13, 'Diamonds'),
      new Card(1, 'Diamonds')
    ]

    let sortedCards = [
      new Card(1, 'Diamonds'),
      new Card(13, 'Spades'),
      new Card(13, 'Diamonds'),
      new Card(11, 'Spades'),
      new Card(11, 'Diamonds'),
      new Card(9, 'Spades'),
      new Card(7, 'Clubs'),
      new Card(7, 'Diamonds'),
      new Card(5, 'Clubs'),
      new Card(4, 'Hearts')
    ]

    let result = sortHighToLow(unsortedCards);
    assert.isArray(result, 'sortHighToLow returns an array');
    assert.equal(result.length, unsortedCards.length, 'sortHighToLow does not exclude any cards from its return value');
    assert.deepEqual(result, sortedCards, 'sortHighToLow returns the sorted cards');
  });
});