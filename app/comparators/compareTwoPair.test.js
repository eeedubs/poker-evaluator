const chai                                = require('chai');
const sinon                               = require('sinon');
const assert                              = chai.assert
const expect                              = chai.expect
const { Card, Hand, Deck }                = require('../index');
const { comparePickFive, compareTwoPair } = require('./index');

describe('#compareTwoPair()', () => {
  let bestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Clubs'),
    new Card(13, 'Hearts'),
    new Card(13, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerHighPairBestFive = [
    new Card(13, 'Spades'),
    new Card(13, 'Clubs'),
    new Card(12, 'Hearts'),
    new Card(12, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerLowPairBestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Clubs'),
    new Card(12, 'Hearts'),
    new Card(12, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerKickerBestFive = [
    new Card(1, 'Diamonds'),
    new Card(1, 'Hearts'),
    new Card(13, 'Clubs'),
    new Card(13, 'Diamonds'),
    new Card(8, 'Spades')
  ]

  const deck                          = new Deck();
  const bestHand                      = new Hand(deck);
  const bestHandDuplicate             = new Hand(deck);
  const lowerHighPairHand             = new Hand(deck);
  const lowerLowNumbersHand           = new Hand(deck);
  const lowerKickerHand               = new Hand(deck);
  bestHand.bestFiveCards              = bestFive;
  bestHandDuplicate.bestFiveCards     = bestFive;
  lowerHighPairHand.bestFiveCards     = lowerHighPairBestFive;
  lowerLowNumbersHand.bestFiveCards   = lowerLowPairBestFive;
  lowerKickerHand.bestFiveCards       = lowerKickerBestFive;

  it('has a single winner', () => {
    let hands = [bestHand, lowerHighPairHand, lowerLowNumbersHand, lowerKickerHand]
    let winner = compareTwoPair(hands, comparePickFive);
    assert.isArray(winner, 'compareTwoPair returns an array containing the winner');
    assert.equal(winner.length, 1, 'there is 1 winner');
    assert.deepEqual(winner[0], bestHand, 'the winner is the trip 1s with a pair of 9s');
  });

  it('has multiple winners', () => {
    let hands = [bestHand, bestHandDuplicate];
    let winner = compareTwoPair(hands, comparePickFive);
    assert.isArray(winner, 'compareTwoPair returns an array containing the winners');
    assert.equal(winner.length, 2, 'there are 2 winners');
    assert.deepEqual(winner, hands, 'the winners are the two hands passed in to the function');
  });
});