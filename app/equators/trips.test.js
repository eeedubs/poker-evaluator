const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateTrips = require('./trips');

describe('#trips()', () => {
  describe('is trips', () => {
    it('has 2 sets of trips', () => {
      let unsortedPokerHand = [
        new Card(1, 'Spades'),
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(11, 'Spades'),
        new Card(11, 'Clubs'),
      ]

      let discardCards = [
        new Card(8, 'Diamonds'),
        new Card(6, 'Clubs'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateTrips(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Trips', 'returns "Trips" as the highestHand');
    });

    it('has trips', () => {
      let unsortedPokerHand = [
        new Card(9, 'Diamonds'),
        new Card(9, 'Hearts'),
        new Card(9, 'Spades'),
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
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equateTrips(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Trips', 'returns "Trips" as the highestHand');
    });
  });

  describe('is not Trips', () => {
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
      
      let result = equateTrips(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });
    
    it('is passed an empty array for combo', () => {
      let result = equateTrips([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});