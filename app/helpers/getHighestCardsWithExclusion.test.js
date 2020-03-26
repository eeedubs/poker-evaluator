const chai                          = require('chai');
const assert                        = chai.assert
const { Card }                      = require('../index');
const getHighestCardsWithExclusion  = require('./getHighestCardsWithExclusion');

describe('#getHighestCardsWithExclusion()', () => {
  describe('it returns cards', () => {
    it('returns all the cards when cardsToIgnore = [] and numberToKeep === combo.length', () => {
      let combo = [
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
      let cardsToIgnore = [];
      let numberToKeep = combo.length;

      let result = getHighestCardsWithExclusion(combo, cardsToIgnore, numberToKeep);
      assert.isArray(result, 'the return value is an array');
      assert.equal(result.length, numberToKeep, 'the function returns 10 cards');
      assert.deepEqual(result, combo, 'the function returns the cards');
    });

    it('returns a subset of cards when given an array of cards (out of order) to ignore from the combo', () => {
      let combo = [
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

      let cardsToIgnore = [combo[0], combo[2], combo[4], combo[6], combo[8]]
      let intendedResult = [combo[1], combo[3], combo[5], combo[7], combo[9]]
      let numberToKeep = intendedResult.length;

      let result = getHighestCardsWithExclusion(combo, cardsToIgnore, numberToKeep);
      assert.isArray(result, 'the return value is an array');
      assert.equal(result.length, numberToKeep, 'the function returns 5 cards');
      assert.deepEqual(result, intendedResult, 'the function returns the cards');
    });

    it('returns a subset of cards when given an array of cards (in order) to ignore from the combo', () => {
      let combo = [
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

      let cardsToIgnore = combo.slice(0, 5);
      let intendedResult = combo.slice(5, combo.length);
      let numberToKeep = intendedResult.length;

      let result = getHighestCardsWithExclusion(combo, cardsToIgnore, numberToKeep);
      assert.isArray(result, 'the return value is an array');
      assert.equal(result.length, numberToKeep, 'the function returns 5 cards');
      assert.deepEqual(result, intendedResult, 'the function returns the cards');
    });
  })

  describe('it does not return cards', () => {
    it('returns no cards when cardsToIgnore = [] and numberToKeep === 0', () => {
      let combo = [
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
      let cardsToIgnore = [];
      let numberToKeep = 0;

      let result = getHighestCardsWithExclusion(combo, cardsToIgnore, numberToKeep);
      assert.isArray(result, 'the return value is an array');
      assert.equal(result.length, numberToKeep, 'the returned array is 0 cards long');
      assert.deepEqual(result, [], 'the function returns no cards');
    });

    it('returns no cards when cardsToIgnore = combo and numberToKeep === combo.length', () => {
      let combo = [
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
      let cardsToIgnore = combo;
      let numberToKeep = combo.length;

      let result = getHighestCardsWithExclusion(combo, cardsToIgnore, numberToKeep);
      assert.isArray(result, 'the return value is an array');
      assert.equal(result.length, 0, 'the returned array is 0 cards long');
      assert.deepEqual(result, [], 'the function returns 0 cards');
    });
  });
});
