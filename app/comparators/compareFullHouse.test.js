const chai                                  = require('chai');
const sinon                                 = require('sinon');
const assert                                = chai.assert
const expect                                = chai.expect
const { Card, Hand, Deck }                  = require('../index');
const { comparePickFive, compareFullHouse } = require('./index');


describe('#compareFullHouse()', () => {
  let bestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Clubs'),
    new Card(1, 'Hearts'),
    new Card(9, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerTripsBestFive = [
    new Card(13, 'Spades'),
    new Card(13, 'Clubs'),
    new Card(13, 'Hearts'),
    new Card(9, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerPairsBestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Clubs'),
    new Card(1, 'Hearts'),
    new Card(8, 'Diamonds'),
    new Card(8, 'Spades')
  ]

  const deck                          = new Deck();
  const bestHand                      = new Hand(deck);
  const bestHandDuplicate             = new Hand(deck);
  const lowerTripsHand                = new Hand(deck);
  const lowerPairsHand                = new Hand(deck);
  bestHand.bestFiveCards              = bestFive;
  bestHandDuplicate.bestFiveCards     = bestFive;
  lowerTripsHand.bestFiveCards        = lowerTripsBestFive;
  lowerPairsHand.bestFiveCards        = lowerPairsBestFive;

  it('has a single winner', () => {
    let hands = [bestHand, lowerTripsHand, lowerPairsHand]
    let winner = compareFullHouse(hands, comparePickFive);
    assert.isArray(winner, 'compareFullHouse returns an array containing the winner');
    assert.equal(winner.length, 1, 'there is 1 winner');
    assert.deepEqual(winner[0], bestHand, 'the winner is the trip 1s with a pair of 9s');
  });

  it('has multiple winners', () => {
    let hands = [bestHand, bestHandDuplicate];
    let winner = compareFullHouse(hands, comparePickFive);
    assert.isArray(winner, 'compareFullHouse returns an array containing the winners');
    assert.equal(winner.length, 2, 'there are 2 winners');
    assert.deepEqual(winner, hands, 'the winners are the two hands passed in to the function');
  });
});