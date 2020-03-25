const chai                              = require('chai');
const sinon                             = require('sinon');
const assert                            = chai.assert
const expect                            = chai.expect
const { Card, Hand, Deck }              = require('../index');
const { comparePickFive, compareTrips } = require('./index');

describe('#compareTrips()', () => {
  let bestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Hearts'),
    new Card(1, 'Clubs'),
    new Card(12, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerTripsBestFive = [
    new Card(13, 'Spades'),
    new Card(13, 'Hearts'),
    new Card(13, 'Clubs'),
    new Card(12, 'Diamonds'),
    new Card(9, 'Spades')
  ]
  
  let lowerKickerBestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Hearts'),
    new Card(1, 'Clubs'),
    new Card(12, 'Diamonds'),
    new Card(8, 'Spades')
  ]

  const deck                          = new Deck();
  const bestHand                      = new Hand(deck);
  const bestHandDuplicate             = new Hand(deck);
  const lowerTripsHand                = new Hand(deck);
  const lowerKickerHand               = new Hand(deck);
  bestHand.bestFiveCards              = bestFive;
  bestHandDuplicate.bestFiveCards     = bestFive;
  lowerTripsHand.bestFiveCards        = lowerTripsBestFive;
  lowerKickerHand.bestFiveCards       = lowerKickerBestFive;

  it('has a single winner', () => {
    let hands = [bestHand, lowerTripsHand, lowerKickerHand]
    let winner = compareTrips(hands, comparePickFive);
    assert.isArray(winner, 'compareTrips returns an array containing the winner');
    assert.equal(winner.length, 1, 'there is 1 winner');
    assert.deepEqual(winner[0], bestHand, 'the winner is the trip 1s');
  });

  it('has multiple winners', () => {
    let hands = [bestHand, bestHandDuplicate];
    let winner = compareTrips(hands, comparePickFive);
    assert.isArray(winner, 'compareTrips returns an array containing the winners');
    assert.equal(winner.length, 2, 'there are 2 winners');
    assert.deepEqual(winner, hands, 'the winners are the two hands passed in to the function');
  });
});