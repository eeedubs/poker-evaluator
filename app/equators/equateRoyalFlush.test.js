const { assert } = require('chai');
const { sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateRoyalFlush = require('./equateRoyalFlush');

describe('#royalFlush()', () => {
  describe('is a Royal Flush', () => {
    it('is aces high', () => {
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
      
      let result = equateRoyalFlush(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Royal Flush', 'returns "Royal Flush" as the highestHand');
    });
  });

  describe('is not a Royal Flush', () => {
    it('is a straight but has no flush', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(13, 'Spades'),
        new Card(12, 'Spades'),
        new Card(11, 'Spades'),
        new Card(10, 'Spades'),
      ]

      let discardCards = [
        new Card(8, 'Diamonds'),
        new Card(7, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateRoyalFlush(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is a flush but has no straight', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(12, 'Spades'),
        new Card(11, 'Spades'),
        new Card(10, 'Spades'),
        new Card(9, 'Spades'),
      ]

      let discardCards = [
        new Card(5, 'Diamonds'),
        new Card(3, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateRoyalFlush(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is a straight flush but not a royal flush', () => {
      let unsortedPokerHand = [
        new Card(13, 'Spades'),
        new Card(12, 'Spades'),
        new Card(11, 'Spades'),
        new Card(10, 'Spades'),
        new Card(9, 'Spades'),
      ]

      let discardCards = [
        new Card(5, 'Diamonds'),
        new Card(3, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateRoyalFlush(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty hand', () => {
      let result = equateRoyalFlush([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});