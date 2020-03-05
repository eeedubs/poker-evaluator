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
      
      let result = equateFourOfAKind(hand.combo, hand.cardNumbers, hand.cardSuites);
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
      
      let result = equateFourOfAKind(hand.combo, hand.cardNumbers, hand.cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed empty arrays for combo, cardNumbers and cardSuites', () => {
      const combo = [];
      const cardNumbers = [];
      const cardSuites = [];
      
      let result = equateFourOfAKind(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for cardSuites', () => {
      let card1 = new Card(1, 'Diamonds');
      let card2 = new Card(1, 'Clubs');
      let card3 = new Card(1, 'Hearts');
      let card4 = new Card(1, 'Spades');
      let card5 = new Card(3, 'Diamonds');
      let card6 = new Card(10, 'Hearts');
      let card7 = new Card(12, 'Spades');

      const combo = [card1, card2, card3, card4, card5, card6, card7]
      const cardNumbers = [1, 3, 5, 6, 8, 10, 12];
      const cardSuites  = [];
      
      let result = equateFourOfAKind(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for combo', () => {
      const combo = [];
      const cardNumbers = [1, 2, 3, 4, 5, 6, 7];
      const cardSuites = ['diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'heart', 'spade'];
      
      let result = equateFourOfAKind(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});