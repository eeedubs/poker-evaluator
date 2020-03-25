const { sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let pokerHand = sortHighToLow(hand.combo).slice(0, 5);
  return { highestHand: 'High Card', pokerHand: pokerHand };
});