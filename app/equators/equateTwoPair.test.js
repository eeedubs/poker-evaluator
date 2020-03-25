const { assert } = require('chai');
const { sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateTwoPair = require('./equateTwoPair');

describe('#twoPair()', () => {
  describe('it is a Two Pair', () => {
    it('has 3 pairs', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(1, 'Diamonds'),
        new Card(13, 'Clubs'),
        new Card(13, 'Spades'),
        new Card(10, 'Clubs'),
      ]

      let discardCards = [
        new Card(10, 'Diamonds'),
        new Card(6, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateTwoPair(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Two Pair', 'returns "Two Pair" as the highestHand');
    });

    it('has 2 pairs', () => {
      let unsortedPokerHand = [
        new Card(9, 'Diamonds'),
        new Card(9, 'Hearts'),
        new Card(6, 'Spades'),
        new Card(6, 'Diamonds'),
        new Card(5, 'Diamonds'),
      ]

      let discardCards = [
        new Card(4, 'Diamonds'),
        new Card(3, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateTwoPair(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Two Pair', 'returns "Two Pair" as the highestHand');
    });
  });

  describe('is not a Two Pair', () => {
    it('is only a pair', () => {
      let unsortedPokerHand = [
        new Card(13, 'Spades'),
        new Card(13, 'Spades'),
        new Card(11, 'Spades'),
        new Card(10, 'Spades'),
        new Card(6, 'Spades'),
      ]

      let discardCards = [
        new Card(5, 'Diamonds'),
        new Card(3, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateTwoPair(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty hand', () => {  
      let result = equateTwoPair([]);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });
  });
});