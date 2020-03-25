const chai                              = require('chai');
const sinon                             = require('sinon');
const assert                            = chai.assert
const expect                            = chai.expect
const { Card, Hand, Deck }              = require('../index');
const { comparePickFive, comparePair }  = require('./index');


describe('#comparePair()', () => {
  let bestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Hearts'),
    new Card(11, 'Clubs'),
    new Card(8, 'Diamonds'),
    new Card(5, 'Spades')
  ]

  let lowerPairBestFive = [
    new Card(13, 'Spades'),
    new Card(13, 'Hearts'),
    new Card(12, 'Clubs'),
    new Card(11, 'Diamonds'),
    new Card(10, 'Spades')
  ]
  
  let lowerKickerBestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Hearts'),
    new Card(11, 'Clubs'),
    new Card(8, 'Diamonds'),
    new Card(4, 'Spades')
  ]

  const deck                          = new Deck();
  const bestHand                      = new Hand(deck);
  const bestHandDuplicate             = new Hand(deck);
  const lowerPairHand                 = new Hand(deck);
  const lowerKickerHand               = new Hand(deck);
  bestHand.bestFiveCards              = bestFive;
  bestHandDuplicate.bestFiveCards     = bestFive;
  lowerPairHand.bestFiveCards         = lowerPairBestFive;
  lowerKickerHand.bestFiveCards       = lowerKickerBestFive;

  it('has a single winner', () => {
    let hands = [bestHand, lowerPairHand, lowerKickerHand]
    let winner = comparePair(hands, comparePickFive);
    assert.isArray(winner, 'comparePair returns an array containing the winner');
    assert.equal(winner.length, 1, 'there is 1 winner');
    assert.deepEqual(winner[0], bestHand, 'the winner is the pair of 1s');
  });

  it('has multiple winners', () => {
    let hands = [bestHand, bestHandDuplicate];
    let winner = comparePair(hands, comparePickFive);
    assert.isArray(winner, 'comparePair returns an array containing the winners');
    assert.equal(winner.length, 2, 'there are 2 winners');
    assert.deepEqual(winner, hands, 'the winners are the two hands passed in to the function');
  });
});