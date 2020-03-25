const { getStraightHighCard, getFlushSuite, sortHighToLow } = require('../helpers/index');
const equateStraightFlush = require('./equateStraightFlush');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let straightFlushHand = equateStraightFlush(hand).pokerHand
  if (!straightFlushHand) { return { highestHand: null, pokerHand: null } };
  
  let pokerHand         = [];
  let straightHighCard  = straightFlushHand[0].number;
  
  if (straightHighCard === 1){
    pokerHand = straightFlushHand;
    return { highestHand: 'Royal Flush', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});