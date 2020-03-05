const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let unsortedCards = getHighestCardsWithExclusion(combo, [], 5);
  let pokerHand = sortPokerHand(unsortedCards);
  return { highestHand: 'High Card', pokerHand: pokerHand };
});