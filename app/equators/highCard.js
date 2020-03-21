const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let unsortedCards = getHighestCardsWithExclusion(hand.combo, [], 5);
  let pokerHand = sortPokerHand(unsortedCards);
  return { highestHand: 'High Card', pokerHand: pokerHand };
});