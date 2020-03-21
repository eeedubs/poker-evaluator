const { getStraightHighCard, getFlushSuite, sortPokerHand } = require('./helpers/index');
const equateStraightFlush = require('./straightFlush');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let isStraightFlush = equateStraightFlush(hand).pokerHand
  if (!isStraightFlush) { return { highestHand: null, pokerHand: null } };
  let pokerHand = [];
  let straightHighCard  = getStraightHighCard(hand.cardNumbers);
  let flushSuite        = getFlushSuite(hand.cardSuites);
  if (straightHighCard === 1){
    let unsortedCards = hand.combo.filter((card) => { 
      return ([1, 10, 11, 12, 13].includes(card.number) && card.suite == flushSuite) 
    });
    pokerHand = sortPokerHand(unsortedCards);
    return { highestHand: 'Royal Flush', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});