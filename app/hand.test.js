const chai        = require('chai');
const sinon       = require('sinon');
const assert      = chai.assert
const expect      = chai.expect

const { Hand, Deck, Card } = require('./index');
const equators             = require('./equators/index');

describe('#Hand()', () => {
  it('it creates a hand with 2 cards and a deck', () => {
    let deck = new Deck()
    let hand = new Hand(deck);
    
    assert.isObject(hand, 'the deck is an object');

    assert.isObject(hand.deck, 'the deck is an object');
    assert.equal(hand.deck, deck, 'the deck is correctly assigned');
  });

  describe('internal functions', () => {
    let deck = new Deck()
    const cardOne = new Card(1, 'Spades');
    const cardTwo = new Card(2, 'Diamonds');
    const cardThree = new Card(3, 'Diamonds');
    const cardFour = new Card(4, 'Diamonds');
    const cardFive = new Card(11, 'Diamonds');
    const cardSix = new Card(12, 'Diamonds');
    const cardSeven = new Card(13, 'Diamonds');
    let cards = [cardOne, cardTwo];
    let river = { cards: [cardThree, cardFour, cardFive, cardSix, cardSeven] };
    let hand = new Hand(deck, cards);
    hand.setRiver(river)

    it('it can get the card numbers in an array', () => {
      let comboNumbers = [1, 2, 3, 4, 11, 12, 13];
      assert.isArray(hand.comboNumbers, 'comboNumbers returns an array');
      assert.deepEqual(hand.comboNumbers, comboNumbers, 'comboNumbers returns the sorted card numbers');
    });

    it('it can get the card suites in an array', () => {
      let cardSuites = ['Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Diamonds', 'Spades'];
      assert.isArray(hand.comboSuites, 'cardSuites returns an array');
      assert.deepEqual(hand.comboSuites, cardSuites, 'cardSuites returns the cardSuites');
    });

    it('it can get the high card number value', () => {
      let highCardNumberValue = 1;
      assert.isNumber(hand.highCardNumberValue, 'highCardNumberValue returns a Number');
      assert.deepEqual(hand.highCardNumberValue, highCardNumberValue, 'highCardNumberValue returns the highCardNumberValue');
    });

    it('it can get the high card suite value', () => {
      let highCardSuiteValue = 'Spades';
      assert.isString(hand.highCardSuiteValue, 'highCardSuiteValue returns a String');
      assert.deepEqual(hand.highCardSuiteValue, highCardSuiteValue, 'highCardSuiteValue returns the highCardSuiteValue');
    });

    describe('get pokerHandStrength', () => {
      it('it can get the strength of a Royal Flush', () => {
        let strength = 10;
        hand.highestHand = 'Royal Flush';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (10)');
      });

      it('it can get the strength of a Straight Flush', () => {
        let strength = 9;
        hand.highestHand = 'Straight Flush';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (9)');
      });

      it('it can get the strength of a Four Of A Kind', () => {
        let strength = 8;
        hand.highestHand = 'Four Of A Kind';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (8)');
      });

      it('it can get the strength of a Full House', () => {
        let strength = 7;
        hand.highestHand = 'Full House';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (7)');
      });

      it('it can get the strength of a Flush', () => {
        let strength = 6;
        hand.highestHand = 'Flush';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (6)');
      });

      it('it can get the strength of a Straight', () => {
        let strength = 5;
        hand.highestHand = 'Straight';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (5)');
      });

      it('it can get the strength of a Trips', () => {
        let strength = 4;
        hand.highestHand = 'Trips';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (4)');
      });

      it('it can get the strength of a Two Pair', () => {
        let strength = 3;
        hand.highestHand = 'Two Pair';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (3)');
      });

      it('it can get the strength of a Pair', () => {
        let strength = 2;
        hand.highestHand = 'Pair';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (2)');
      });

      it('it can get the strength of a High Card', () => {
        let strength = 1;
        hand.highestHand = 'High Card';
        assert.isNumber(hand.pokerHandStrength, 'pokerHandStrength returns a Number');
        assert.deepEqual(hand.pokerHandStrength, strength, 'pokerHandStrength returns the strength (1)');
      });
    });
  });

  describe('evaluateHandOutcomes', () => {
    it('can recognize a Royal Flush', () => {
      let deck = new Deck()
      const cardOne = new Card(1, 'Spades');
      const cardTwo = new Card(2, 'Diamonds');
      const cardThree = new Card(3, 'Diamonds');
      const cardFour = new Card(10, 'Spades');
      const cardFive = new Card(11, 'Spades');
      const cardSix = new Card(12, 'Spades');
      const cardSeven = new Card(13, 'Spades');
      let cards = [cardOne, cardTwo];
      let river = { cards: [cardThree, cardFour, cardFive, cardSix, cardSeven] };
      let hand = new Hand(deck, cards);
      
      let royalFlushSpy = sinon.spy(equators, "equateRoyalFlush");
      let straightFlushSpy = sinon.spy(equators, "equateStraightFlush");
      let fourOfAKindSpy = sinon.spy(equators, "equateFourOfAKind");
      let fullHouseSpy = sinon.spy(equators, "equateFullHouse");
      let flushSpy = sinon.spy(equators, "equateFlush");
      let straightSpy = sinon.spy(equators, "equateStraight");
      let tripsSpy = sinon.spy(equators, "equateTrips");
      let twoPairSpy = sinon.spy(equators, "equateTwoPair");
      let pairSpy = sinon.spy(equators, "equatePair");
      let highCardSpy = sinon.spy(equators, "equateHighCard");

      hand.setRiver(river);
      hand.evaluateHandOutcomes();
      sinon.restore();
      
      assert.equal(hand.highestHand, 'Royal Flush', 'the highest hand is a Royal Flush');
      assert.equal(hand.handValue, 10, 'the hand value is 10');
      assert(royalFlushSpy.withArgs(hand).calledOnce);
      assert(straightFlushSpy.withArgs(hand).notCalled);
      assert(fourOfAKindSpy.withArgs(hand).notCalled);
      assert(fullHouseSpy.withArgs(hand).notCalled);
      assert(flushSpy.withArgs(hand).notCalled);
      assert(straightSpy.withArgs(hand).notCalled)
      assert(tripsSpy.withArgs(hand).notCalled)
      assert(twoPairSpy.withArgs(hand).notCalled)
      assert(pairSpy.withArgs(hand).notCalled)
      assert(highCardSpy.withArgs(hand).notCalled)
    });

    it('can recognize a Straight', () => {
      let deck = new Deck()
      const cardOne = new Card(1, 'Spades');
      const cardTwo = new Card(2, 'Diamonds');
      const cardThree = new Card(5, 'Clubs');
      const cardFour = new Card(6, 'Spades');
      const cardFive = new Card(7, 'Hearts');
      const cardSix = new Card(8, 'Spades');
      const cardSeven = new Card(9, 'Diamonds');
      let cards = [cardOne, cardTwo];
      let river = { cards: [cardThree, cardFour, cardFive, cardSix, cardSeven] };
      let hand = new Hand(deck, cards);
      
      let royalFlushSpy = sinon.spy(equators, "equateRoyalFlush");
      let straightFlushSpy = sinon.spy(equators, "equateStraightFlush");
      let fourOfAKindSpy = sinon.spy(equators, "equateFourOfAKind");
      let fullHouseSpy = sinon.spy(equators, "equateFullHouse");
      let flushSpy = sinon.spy(equators, "equateFlush");
      let straightSpy = sinon.spy(equators, "equateStraight");
      let tripsSpy = sinon.spy(equators, "equateTrips");
      let twoPairSpy = sinon.spy(equators, "equateTwoPair");
      let pairSpy = sinon.spy(equators, "equatePair");
      let highCardSpy = sinon.spy(equators, "equateHighCard");

      hand.setRiver(river);
      hand.evaluateHandOutcomes();
      sinon.restore();
      
      assert.equal(hand.highestHand, 'Straight', 'the highest hand is a Straight');
      assert.equal(hand.handValue, 5, 'the hand value is 5');
      assert(royalFlushSpy.withArgs(hand).calledOnce);
      assert(straightFlushSpy.withArgs(hand).calledOnce);
      assert(fourOfAKindSpy.withArgs(hand).calledOnce);
      assert(fullHouseSpy.withArgs(hand).calledOnce);
      assert(flushSpy.withArgs(hand).calledOnce);
      assert(straightSpy.withArgs(hand).calledOnce)
      assert(tripsSpy.withArgs(hand).notCalled)
      assert(twoPairSpy.withArgs(hand).notCalled)
      assert(pairSpy.withArgs(hand).notCalled)
      assert(highCardSpy.withArgs(hand).notCalled)
    });

    it('can recognize a High Card', () => {
      let deck = new Deck()
      const cardOne = new Card(1, 'Spades');
      const cardTwo = new Card(2, 'Diamonds');
      const cardThree = new Card(5, 'Clubs');
      const cardFour = new Card(6, 'Spades');
      const cardFive = new Card(11, 'Hearts');
      const cardSix = new Card(8, 'Spades');
      const cardSeven = new Card(9, 'Diamonds');
      let cards = [cardOne, cardTwo];
      let river = { cards: [cardThree, cardFour, cardFive, cardSix, cardSeven] };
      let hand = new Hand(deck, cards);
      
      let royalFlushSpy = sinon.spy(equators, "equateRoyalFlush");
      let straightFlushSpy = sinon.spy(equators, "equateStraightFlush");
      let fourOfAKindSpy = sinon.spy(equators, "equateFourOfAKind");
      let fullHouseSpy = sinon.spy(equators, "equateFullHouse");
      let flushSpy = sinon.spy(equators, "equateFlush");
      let straightSpy = sinon.spy(equators, "equateStraight");
      let tripsSpy = sinon.spy(equators, "equateTrips");
      let twoPairSpy = sinon.spy(equators, "equateTwoPair");
      let pairSpy = sinon.spy(equators, "equatePair");
      let highCardSpy = sinon.spy(equators, "equateHighCard");

      hand.setRiver(river);
      hand.evaluateHandOutcomes();
      sinon.restore();
      
      assert.equal(hand.highestHand, 'High Card', 'the highest hand is a High Card');
      assert.equal(hand.handValue, 1, 'the hand value is 1');
      assert(royalFlushSpy.withArgs(hand).calledOnce);
      assert(straightFlushSpy.withArgs(hand).calledOnce);
      assert(fourOfAKindSpy.withArgs(hand).calledOnce);
      assert(fullHouseSpy.withArgs(hand).calledOnce);
      assert(flushSpy.withArgs(hand).calledOnce);
      assert(straightSpy.withArgs(hand).calledOnce)
      assert(tripsSpy.withArgs(hand).calledOnce)
      assert(twoPairSpy.withArgs(hand).calledOnce)
      assert(pairSpy.withArgs(hand).calledOnce)
      assert(highCardSpy.withArgs(hand).calledOnce)
    });
  });
});