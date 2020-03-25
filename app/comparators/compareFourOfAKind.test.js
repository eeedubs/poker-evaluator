const chai                                    = require('chai');
const sinon                                   = require('sinon');
const assert                                  = chai.assert
const expect                                  = chai.expect
const { Card, Hand, Deck }                    = require('../index');
const { comparePickFive, compareFourOfAKind } = require('./index');

describe('#compareFourOfAKind()', () => {
  let bestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Hearts'),
    new Card(1, 'Clubs'),
    new Card(1, 'Diamonds'),
    new Card(9, 'Spades')
  ]

  let lowerQuadBestFive = [
    new Card(13, 'Spades'),
    new Card(13, 'Hearts'),
    new Card(13, 'Clubs'),
    new Card(13, 'Diamonds'),
    new Card(9, 'Spades')
  ]
  
  let lowerKickerBestFive = [
    new Card(1, 'Spades'),
    new Card(1, 'Hearts'),
    new Card(1, 'Clubs'),
    new Card(1, 'Diamonds'),
    new Card(8, 'Spades')
  ]

  const deck                          = new Deck();
  const bestHand                      = new Hand(deck);
  const bestHandDuplicate             = new Hand(deck);
  const lowerQuadHand                 = new Hand(deck);
  const lowerKickerHand               = new Hand(deck);
  bestHand.bestFiveCards              = bestFive;
  bestHandDuplicate.bestFiveCards     = bestFive;
  lowerQuadHand.bestFiveCards         = lowerQuadBestFive;
  lowerKickerHand.bestFiveCards       = lowerKickerBestFive;

  it('has a single winner', () => {
    let hands   = [bestHand, lowerQuadHand, lowerKickerHand]
    let winner  = compareFourOfAKind(hands, comparePickFive);
    // sinon.restore();

    assert.isArray(winner, 'compareFourOfAKind returns an array containing the winner');
    assert.equal(winner.length, 1, 'there is 1 winner');
    assert.deepEqual(winner[0], bestHand, 'the winner is the quad 1s with the 9 of spades');
    // assert(
    // assert(comparePickFiveSpy.withArgs(lowerQuadHand).calledOnce);
    // assert(comparePickFiveSpy.withArgs(lowerKickerHand).calledOnce);
  });

  it('has multiple winners', () => {
    let hands = [bestHand, bestHandDuplicate];
    let winner = compareFourOfAKind(hands, comparePickFive);
    assert.isArray(winner, 'compareFourOfAKind returns an array containing the winners');
    assert.equal(winner.length, 2, 'there are 2 winners');
    assert.deepEqual(winner, hands, 'the winners are the two hands passed in to the function');
  });
});