const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateFourOfAKind = require('./fourOfAKind');

describe('#fourOfAKind()', () => {
  describe('is four of a kind', () => {
    it('is passed a combo where four card numbers are the same', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(1, 'Spades'),
        new Card(7, 'Spades'),
      ]

      let discardCards = [
        new Card(5, 'Spades'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateFourOfAKind(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Four Of A Kind', 'returns "Four Of A Kind" as the highestHand');
    });
  });

  describe('is not four of a kind', () => {
    it('is passed a combo where three card numbers are the same', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(2, 'Spades'),
        new Card(7, 'Spades'),
      ]

      let discardCards = [
        new Card(5, 'Spades'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateFourOfAKind(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for combo', () => {
      let result = equateFourOfAKind([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});