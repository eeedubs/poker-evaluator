const { assert } = require('chai');
const equateFlush = require('./flush');
const Card = require('../card');

describe('#isFlush()', () => {
  describe('is a flush', () => {
    it('is passed a combo where seven card suites are the same', () => {
      let card1 = new Card(1, 'Diamonds');
      let card2 = new Card(11, 'Diamonds');
      let card3 = new Card(8, 'Diamonds');
      let card4 = new Card(6, 'Diamonds');
      let card5 = new Card(5, 'Diamonds');
      let card6 = new Card(4, 'Diamonds');
      let card7 = new Card(2, 'Diamonds');

      const combo = [card1, card2, card3, card4, card5, card6, card7]
      const cardNumbers = [1, 2, 4, 5, 6, 8, 11];
      const cardSuites  = ['Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Hearts', 'Spades'];
      const pokerHand = [card1, card2, card3, card4, card5];
      
      let result = equateFlush(combo, cardNumbers, cardSuites);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Flush', 'returns "Flush" as the highestHand');
    });

    it('is passed a combo where five card suites are the same', () => {
      let card1 = new Card(1, 'Diamonds');
      let card2 = new Card(8, 'Diamonds');
      let card3 = new Card(6, 'Diamonds');
      let card4 = new Card(5, 'Diamonds');
      let card5 = new Card(3, 'Diamonds');
      let card6 = new Card(10, 'Hearts');
      let card7 = new Card(12, 'Spades');

      const combo = [card1, card2, card3, card4, card5, card6, card7]
      const cardNumbers = [1, 3, 5, 6, 8, 10, 12];
      const cardSuites  = ['Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Hearts', 'Spades'];
      const pokerHand = [card1, card2, card3, card4, card5];
      
      let result = equateFlush(combo, cardNumbers, cardSuites);
      assert.isNotNull(result);
      assert.deepEqual(result.pokerHand, pokerHand, 'returns the pokerHand, sorted from highest to lowest');
      assert.deepEqual(result.highestHand, 'Flush', 'returns "Flush" as the highestHand');
    });
  });

  describe('is not a flush', () => {
    it('is passed a combo where four card suites are the same', () => {
      let card1 = new Card(1, 'Diamonds');
      let card2 = new Card(8, 'Diamonds');
      let card3 = new Card(6, 'Diamonds');
      let card4 = new Card(5, 'Diamonds');
      let card5 = new Card(3, 'Clubs');
      let card6 = new Card(10, 'Hearts');
      let card7 = new Card(12, 'Spades');

      const combo = [card1, card2, card3, card4, card5, card6, card7]
      const cardNumbers = [1, 3, 5, 6, 8, 10, 12];
      const cardSuites  = ['Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Clubs', 'Hearts', 'Spades'];
      
      let result = equateFlush(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed empty arrays for combo, cardNumbers and cardSuites', () => {
      const combo = [];
      const cardNumbers = [];
      const cardSuites = [];
      
      let result = equateFlush(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for cardSuites', () => {
      let card1 = new Card(1, 'Diamonds');
      let card2 = new Card(8, 'Diamonds');
      let card3 = new Card(6, 'Diamonds');
      let card4 = new Card(5, 'Diamonds');
      let card5 = new Card(3, 'Diamonds');
      let card6 = new Card(10, 'Hearts');
      let card7 = new Card(12, 'Spades');

      const combo = [card1, card2, card3, card4, card5, card6, card7]
      const cardNumbers = [1, 3, 5, 6, 8, 10, 12];
      const cardSuites  = [];
      
      let result = equateFlush(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand, 'highestHand is null');
      assert.isNull(result.pokerHand, 'pokerHand is null');
    });

    it('is passed an empty array for combo', () => {
      const combo = [];
      const cardNumbers = [1, 2, 3, 4, 5, 6, 7];
      const cardSuites = ['diamond', 'diamond', 'diamond', 'diamond', 'diamond', 'heart', 'spade'];
      
      let result = equateFlush(combo, cardNumbers, cardSuites);
      assert.isNull(result.highestHand);
      assert.isNull(result.pokerHand);
    });
  });
});