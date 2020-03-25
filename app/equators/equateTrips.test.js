const { assert } = require('chai');
const { sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateTrips = require('./equateTrips');

describe('#trips()', () => {
  describe('is trips', () => {
    it('has trips', () => {
      let cards = [
        new Card(9, 'Spades'),
        new Card(9, 'Hearts'),
        new Card(9, 'Diamonds'),
        new Card(6, 'Diamonds'),
        new Card(5, 'Diamonds'),
        new Card(4, 'Diamonds'),
        new Card(3, 'Clubs')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards;
      const pokerHand = sortHighToLow(hand.combo).slice(0, 5);
      
      let result = equateTrips(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Trips', 'returns "Trips" as the highestHand');
    });
  });

  describe('is not Trips', () => {
    it('is only a pair', () => {
      let cards = [
        new Card(13, 'Spades'),
        new Card(13, 'Spades'),
        new Card(11, 'Spades'),
        new Card(10, 'Spades'),
        new Card(6, 'Spades'),
        new Card(5, 'Diamonds'),
        new Card(3, 'Clubs')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards
      
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