const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateStraight = require('./straight');

describe('#straight()', () => {
  describe('is a Straight', () => {
    it('is aces high', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(13, 'Diamonds'),
        new Card(12, 'Clubs'),
        new Card(11, 'Spades'),
        new Card(10, 'Hearts'),
      ]

      let discardCards = [
        new Card(8, 'Diamonds'),
        new Card(6, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateStraight(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Straight', 'returns "Straight" as the highestHand');
    });

    it('is 9 high', () => {
      let unsortedPokerHand = [
        new Card(9, 'Spades'),
        new Card(8, 'Diamonds'),
        new Card(7, 'Clubs'),
        new Card(6, 'Spades'),
        new Card(5, 'Hearts'),
      ]

      let discardCards = [
        new Card(4, 'Diamonds'),
        new Card(1, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateStraight(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Straight', 'returns "Straight" as the highestHand');
    });
  });

  describe('is not a Straight', () => {
    it('is only a 4-card straight', () => {
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
      
      let result = equateStraight(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty hand', () => {
      let result = equateStraight([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});