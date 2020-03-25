const equateStraight                          = require('./equateStraight.js');
const equateFlush                             = require('./equateFlush.js');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let straightHand = equateStraight(hand).pokerHand
  let flushHand    = equateFlush(hand).pokerHand
  if (!(straightHand && flushHand)){ 
    return { highestHand: null, pokerHand: null };
  };

  let pokerHand             = [];
  let flushSuite            = flushHand[0].suite;
  let isStraightFlush       = straightHand.every(card => card.suite === flushSuite);
  if (isStraightFlush){
    pokerHand = straightHand
    return { highestHand: 'Straight Flush', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
})