const chai                  = require('chai');
const sinon                 = require('sinon');
const assert                = chai.assert
const expect                = chai.expect
const { Card, Hand, Deck }  = require('../index');
const { comparePickFive }   = require('./index');

describe('#comparePickFive()', () => {
  describe('sorted flush', () => {
    let sameBestFive = [
      new Card(13, 'Spades'),
      new Card(11, 'Spades'),
      new Card(9, 'Spades'),
      new Card(7, 'Spades'),
      new Card(5, 'Spades')
    ]

    let lowerFlushBestFive = [
      new Card(13, 'Spades'),
      new Card(11, 'Spades'),
      new Card(9, 'Spades'),
      new Card(7, 'Spades'),
      new Card(4, 'Spades')
    ]

    const deck                    = new Deck();
    const bestHand                = new Hand(deck);
    const bestHandDuplicate       = new Hand(deck);
    const lowerFlushHand          = new Hand(deck);
    bestHand.bestFiveCards          = sameBestFive;
    bestHandDuplicate.bestFiveCards = sameBestFive;
    lowerFlushHand.bestFiveCards    = lowerFlushBestFive;

    it('has a single winner', () => {
      let hands = [bestHand, lowerFlushHand]
      let winner = comparePickFive(hands, comparePickFive);
      assert.isArray(winner, 'comparePickFive returns an array containing the winner');
      assert.equal(winner.length, 1, 'there is 1 winner');
      assert.deepEqual(winner[0], bestHand, 'the winner is the spades Straight');
    });

    it('has multiple winners', () => {
      let hands = [bestHand, bestHandDuplicate];
      let winner = comparePickFive(hands, comparePickFive);
      assert.isArray(winner, 'comparePickFive returns an array containing the winners');
      assert.equal(winner.length, 2, 'there are 2 winners');
      assert.deepEqual(winner, hands, 'the winners are the two hands passed in to the function');
    });
  });
});