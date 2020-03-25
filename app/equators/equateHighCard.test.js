const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateHighCard = require('./equateHighCard');

describe('#highCard()', () => {
  describe('Returns the cards in descending strength', () => {
    it('Handles four aces', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(1, 'Spades'),
        new Card(13, 'Spades'),
      ]
      
      let discardCards = [
        new Card(12, 'Spades'),
        new Card(11, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateHighCard(hand);
      assert.isNotNull(result);
      assert.equal(result.pokerHand[0], pokerHand[0], 'the first card returned is the Ace of Spades');
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'High Card', 'returns "High Card" as the highestHand');
    });

    it('Handles low cards', () => {
      let unsortedPokerHand = [
        new Card(5, 'Diamonds'),
        new Card(4, 'Diamonds'),
        new Card(4, 'Clubs'),
        new Card(4, 'Hearts'),
        new Card(4, 'Spades'),
      ]
      
      let discardCards = [
        new Card(3, 'Spades'),
        new Card(2, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateHighCard(hand);
      assert.isNotNull(result);
      assert.equal(result.pokerHand[0], pokerHand[0], 'the first card returned is the Ace of Spades');
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'High Card', 'returns "High Card" as the highestHand');
    });
  });
});