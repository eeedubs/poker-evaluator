const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateFlush = require('./flush');

describe('#flush()', () => {
  describe('is a flush', () => {
    it('is passed a combo where seven card suites are the same', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(12, 'Spades'),
        new Card(9, 'Spades'),
        new Card(7, 'Spades'),
        new Card(5, 'Spades'),
      ]

      let discardCards = [
        new Card(3, 'Spades'),
        new Card(2, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateFlush(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Flush', 'returns "Flush" as the highestHand');
    });

    it('is passed a combo where five card suites are the same', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(12, 'Spades'),
        new Card(9, 'Spades'),
        new Card(7, 'Spades'),
        new Card(5, 'Spades'),
      ]

      let discardCards = [
        new Card(3, 'Diamonds'),
        new Card(2, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateFlush(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Flush', 'returns "Flush" as the highestHand');
    });
  });

  describe('is not a flush', () => {
    it('is passed a combo where four card suites are the same', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(12, 'Spades'),
        new Card(9, 'Spades'),
        new Card(7, 'Spades'),
        new Card(5, 'Diamonds'),
      ]

      let discardCards = [
        new Card(3, 'Clubs'),
        new Card(2, 'Hearts'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateFlush(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for combo', () => {
      let result = equateFlush([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});