const { assert } = require('chai');
const { Card, Deck } = require('./index');

describe('#Card()', () => {
  describe('it creates a card', () => {
    it('assigns the number and suite to be null when missing parameters', () => {
      let card = new Card()
      assert.isObject(card, 'the card is an object')
      assert.isNull(card.number, 'the card number is null');
      assert.isNull(card.suite, 'the card suite is null');
    });

    it('it can draw randomly when given a deck', () => {
      let deck = new Deck();
      let card = new Card();
      card.drawRandom(deck)
      assert.isObject(card, 'the card is an object')
      assert.isNumber(card.number, 'the card number is a number');
      assert.isString(card.suite, 'the card suite is a string');
    });

    describe('number and suite will default to null', () => {
      it('will not assign values when the number parameter is NaN', () => {
        let card = new Card('Potato', 'Diamonds')
        assert.isObject(card, 'the card is an object')
        assert.isNull(card.number, 'the card number is null');
        assert.isNull(card.suite, 'the card suite is null');
      });

      it('will not assign values when the number parameter is less than 1', () => {
        let card = new Card(0, 'Diamonds')
        assert.isObject(card, 'the card is an object')
        assert.isNull(card.number, 'the card number is null');
        assert.isNull(card.suite, 'the card suite is null');
      });

      it('will not assign values when the number parameter is greater than 13', () => {
        let card = new Card(14, 'Diamonds')
        assert.isObject(card, 'the card is an object')
        assert.isNull(card.number, 'the card number is null');
        assert.isNull(card.suite, 'the card suite is null');
      });

      it('will not assign values when the suite parameter is invalid', () => {
        let card = new Card(1, 'Potato')
        assert.isObject(card, 'the card is an object')
        assert.isNull(card.number, 'the card number is null');
        assert.isNull(card.suite, 'the card suite is null');
      });
    });

    describe('it can assign 4 different suites', () => {
      it('can assign Diamonds', () => {
        let card = new Card(1, 'Diamonds');
        assert.isObject(card, 'the card is an object')
        assert.isNumber(card.number, 'the card number is a number');
        assert.equal(card.number, 1, 'the card number is 1');
        assert.isString(card.suite, 'the card suite is a string');
        assert.equal(card.suite, 'Diamonds', 'the suite is Diamonds');
      });

      it('can assign Clubs', () => {
        let card = new Card(13, 'Clubs');
        assert.isObject(card, 'the card is an object')
        assert.isNumber(card.number, 'the card number is a number');
        assert.equal(card.number, 13, 'the card number is 13');
        assert.isString(card.suite, 'the card suite is a string');
        assert.equal(card.suite, 'Clubs', 'the suite is Clubs');
      });

      it('can assign Hearts', () => {
        let card = new Card(7, 'Hearts');
        assert.isObject(card, 'the card is an object')
        assert.isNumber(card.number, 'the card number is a number');
        assert.equal(card.number, 7, 'the card number is 7');
        assert.isString(card.suite, 'the card suite is a string');
        assert.equal(card.suite, 'Hearts', 'the suite is Hearts');
      });

      it('can assign Spades', () => {
        let card = new Card(7, 'Spades');
        assert.isObject(card, 'the card is an object')
        assert.isNumber(card.number, 'the card number is a number');
        assert.equal(card.number, 7, 'the card number is 7');
        assert.isString(card.suite, 'the card suite is a string');
        assert.equal(card.suite, 'Spades', 'the suite is Spades');
      });
    });
  });
});