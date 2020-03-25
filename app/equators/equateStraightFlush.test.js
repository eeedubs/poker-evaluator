const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateStraightFlush = require('./equateStraightFlush');

describe('#straightFlush()', () => {
  describe('is a Straight Flush', () => {
    it('is a royal flush', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(13, 'Spades'),
        new Card(12, 'Spades'),
        new Card(11, 'Spades'),
        new Card(10, 'Spades'),
      ]

      let discardCards = [
        new Card(8, 'Diamonds'),
        new Card(6, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateStraightFlush(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Straight Flush', 'returns "Straight Flush" as the highestHand');
    });

    it('is 9 high', () => {
      let unsortedPokerHand = [
        new Card(9, 'Diamonds'),
        new Card(8, 'Diamonds'),
        new Card(7, 'Diamonds'),
        new Card(6, 'Diamonds'),
        new Card(5, 'Diamonds'),
      ]

      let discardCards = [
        new Card(4, 'Diamonds'),
        new Card(1, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateStraightFlush(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Straight Flush', 'returns "Straight Flush" as the highestHand');
    });
  });

  describe('is not a Straight Flush', () => {
    it('is only a 4-card straight Flush', () => {
      let unsortedPokerHand = [
        new Card(13, 'Spades'),
        new Card(12, 'Spades'),
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
      
      let result = equateStraightFlush(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });
    
    it('is passed an empty hand', () => {
      let result = equateStraightFlush([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});