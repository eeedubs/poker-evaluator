const { assert } = require('chai');
const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');
const { Card, Hand, Deck } = require('../index');
const equatePair = require('./pair');

describe('#pair()', () => {
  describe('is a Pair', () => {
    it('is passed a pair', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(13, 'Hearts'),
        new Card(12, 'Diamonds'),
        new Card(11, 'Spades'),
      ]

      let discardCards = [
        new Card(9, 'Spades'),
        new Card(6, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      const pokerHand = sortPokerHand(unsortedPokerHand);
      
      let result = equatePair(hand.combo, hand.cardNumbers, hand.cardSuites);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Pair', 'returns "Pair" as the highestHand');
    });
  });

  describe('is not a Pair', () => {
    it('does not register four of a kind', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(1, 'Spades'),
        new Card(5, 'Spades'),
      ]

      let discardCards = [
        new Card(10, 'Clubs'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equatePair(hand.combo, hand.cardNumbers, hand.cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('does not register trips', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(1, 'Hearts'),
        new Card(13, 'Spades'),
        new Card(10, 'Spades'),
      ]

      let discardCards = [
        new Card(8, 'Clubs'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equatePair(hand.combo, hand.cardNumbers, hand.cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('does not register two pairs', () => {
      let unsortedPokerHand = [
        new Card(1, 'Diamonds'),
        new Card(1, 'Clubs'),
        new Card(13, 'Hearts'),
        new Card(13, 'Spades'),
        new Card(10, 'Spades'),
      ]

      let discardCards = [
        new Card(8, 'Clubs'),
        new Card(3, 'Spades'),
      ]

      const deck = new Deck();
      const hand = new Hand(deck);
      hand.combo = unsortedPokerHand.concat(discardCards);
      
      let result = equatePair(hand.combo, hand.cardNumbers, hand.cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed empty arrays for combo, cardNumbers and cardSuites', () => {
      const combo = [];
      const cardNumbers = [];
      const cardSuites = [];
      
      let result = equatePair(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for cardNumbers', () => {
      let card1 = new Card(1, 'Diamonds');
      let card2 = new Card(1, 'Hearts');
      let card3 = new Card(13, 'Diamonds');
      let card4 = new Card(11, 'Diamonds');
      let card5 = new Card(9, 'Diamonds');
      let card6 = new Card(7, 'Hearts');
      let card7 = new Card(5, 'Spades');

      const combo = [card1, card2, card3, card4, card5, card6, card7]
      const cardNumbers = [];
      const cardSuites  = ['Diamonds', 'Hearts', 'Diamonds', 'Diamonds', 'Diamonds', 'Hearts', 'Spades'];
      
      let result = equatePair(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for combo', () => {
      const combo = [];
      const cardNumbers = [1, 1, 3, 4, 5, 6, 7];
      const cardSuites = ['diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'heart', 'spade'];
      
      let result = equatePair(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});