const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');
const { Card, Hand, Deck } = require('../index');
const equateFullHouse = require('./equateFullHouse');

describe('#fullHouse()', () => {
  describe('is a Full House', () => {
    it('is passed a combo with a set of trips and a pair', () => {
      let unsortedPokerHand = [
        new Card(1, 'Hearts'),
        new Card(1, 'Clubs'),
        new Card(1, 'Diamonds'),
        new Card(3, 'Diamonds'),
        new Card(3, 'Spades'),
      ]

      let discardCards = [
        new Card(9, 'Spades'),
        new Card(6, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortHighToLow(unsortedPokerHand);
      
      let result = equateFullHouse(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Full House', 'returns "Full House" as the highestHand');
    });

    it('is passed a combo with two sets of trips', () => {
      let cards = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(6, 'Hearts'),
        new Card(6, 'Spades'),
        new Card(6, 'Clubs'),
        new Card(3, 'Spades')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards;
      const pokerHand = sortHighToLow(hand.combo).slice(0, 5);
      
      let result = equateFullHouse(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Full House', 'returns "Full House" as the highestHand');
    });

    it('is passed a combo with trips and two pairs', () => {
      let cards = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(6, 'Hearts'),
        new Card(6, 'Spades'),
        new Card(3, 'Clubs'),
        new Card(3, 'Spades')
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = cards
      const pokerHand = sortHighToLow(hand.combo).slice(0, 5);
      
      let result = equateFullHouse(hand);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Full House', 'returns "Full House" as the highestHand');
    });
  });

  describe('is not a Full House', () => {
    it('is passed a combo with trips but no pair', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(6, 'Hearts'),
        new Card(5, 'Spades'),
      ]

      let discardCards = [
        new Card(10, 'Clubs'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateFullHouse(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed a combo with a pair but no trips', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(10, 'Hearts'),
        new Card(8, 'Hearts'),
        new Card(5, 'Spades'),
      ]

      let discardCards = [
        new Card(13, 'Clubs'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateFullHouse(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed a combo with two pairs but no trips', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(10, 'Hearts'),
        new Card(10, 'Diamonds'),
        new Card(5, 'Spades'),
      ]

      let discardCards = [
        new Card(13, 'Clubs'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equateFullHouse(hand);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty hand', () => {
      let result = equateFullHouse([]);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});