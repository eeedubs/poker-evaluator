const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equatePair = require('./equatePair');

describe('#pair()', () => {
  describe('is a Pair', () => {
    it('is passed a pair', () => {
      let cards = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(13, 'Hearts'),
        new Card(12, 'Diamonds'),
        new Card(11, 'Spades'),
        new Card(9, 'Spades'),
        new Card(6, 'Spades')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards
      const pokerHand = sortHighToLow(hand.combo).slice(0, 5);
      
      let result = equatePair(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Pair', 'returns "Pair" as the highestHand');
    });
  });

  describe('is not a Pair', () => {
    it('does not register four of a kind', () => {
      let cards = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(1, 'Spades'),
        new Card(5, 'Spades'),
        new Card(10, 'Clubs'),
        new Card(3, 'Spades')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards;
      
      let result = equatePair(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('does not register trips', () => {
      let cards = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(13, 'Spades'),
        new Card(10, 'Spades'),
        new Card(8, 'Clubs'),
        new Card(3, 'Spades')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards;
      
      let result = equatePair(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('does not register two pairs', () => {
      let cards = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(13, 'Hearts'),
        new Card(13, 'Spades'),
        new Card(10, 'Spades'),
        new Card(8, 'Clubs'),
        new Card(3, 'Spades')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards;
      
      let result = equatePair(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty hand', () => {
      let result = equatePair([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});