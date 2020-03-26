const chai        = require('chai');
const sinon       = require('sinon');
const assert      = chai.assert
const expect      = chai.expect

const { Game, Hand, Deck, Card } = require('./index');

describe('#game()', () => {
  describe('initialize', () => {
    it('it creates a game with a deck and 2 hands by default', () => {
      let game = new Game()
      
      assert.isObject(game, 'game is an object');
      assert.isObject(game.deck, 'game.deck is an object');
      assert.isArray(game.hands, 'game.hands is an array');
      assert.equal(game.hands.length, 2, '2 hands are assigned');
    });
    
    it('it creates a game with a deck and a specified number of hands', () => {
      let game = new Game(5, true)
      
      assert.isObject(game, 'game is an object');
      assert.isObject(game.deck, 'game.deck is an object');
      assert.isArray(game.hands, 'game.hands is an array');
      assert.equal(game.hands.length, 5, '2 hands are assigned');
    });
  });

  describe('internal functions', () => {
    describe('play()', () => {
      it ('deals the cards and determines a winner', () => {
        let game = new Game(2, true)

        let dealSpy = sinon.spy(game, "_deal");
        let dealCardsToEachPlayerSpy = sinon.spy(game, "_dealCardsToEachPlayer");
        let dealRiverSpy = sinon.spy(game, "_dealRiver");
        let evaluateHandOutcomesSpy = sinon.spy(game, "_evaluateHandOutcomes");
        let determineWinnerSpy = sinon.spy(game, "_determineWinner");
        let printResultSpy = sinon.spy(game, "_printResult");

        game.play(true); // isATest === true
        sinon.restore();

        assert.isObject(game.river, 'the game creates a river');
        assert(dealSpy.withArgs().calledOnce, '_deal() is called once');
        assert(dealCardsToEachPlayerSpy.withArgs().calledOnce, '_dealCardsToEachPlayer() is called once');
        assert(dealRiverSpy.withArgs().calledOnce, '_dealRiver() is called once');
        assert(evaluateHandOutcomesSpy.withArgs().calledOnce, '_evaluateHandOutcomes() is called once');
        assert(determineWinnerSpy.withArgs().calledOnce, '_determineWinner() is called once');
        assert(printResultSpy.withArgs().calledOnce, '_printResult() is called when testing');
        
        for (let hand of game.hands){
          assert.isObject(hand, 'each hand is an object');
          assert.isObject(hand.river, 'each hand references the river object');
          assert.isArray(hand.river.cards, "each hand's river has a card array");
          assert.isArray(hand.river.burnPile, "each hand's river has a burn card array");
          assert.equal(hand.river.cards.length, 5, "each hand's river card pile is 5 cards long");
          assert.equal(hand.river.burnPile.length, 3, "each hand's river burn card pile is 3 cards long");
          assert.isString(hand.highestHand, 'each hand is assigned the poker hand type that it corresponds with');
          assert.isNumber(hand.handValue, 'each hand is assigned a number value');
          assert.isAtMost(hand.handValue, 10, 'each hand value is no greater than 10');
          assert.isAtLeast(hand.handValue, 1, 'each hand value is no less than 1');
        }
      });
    });
  });
});