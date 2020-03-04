const { getNextHighestCards } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = getNextHighestCards(combo, [], 5);
  return { highestHand: 'High Card', pokerHand: pokerHand };
});