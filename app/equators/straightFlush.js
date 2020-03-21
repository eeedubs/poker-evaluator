const { getStraightHighCard, getFlushSuite, sortPokerHand }  = require('./helpers/index');
const equateStraight                          = require('./straight.js');
const equateFlush                             = require('./flush.js');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let isStraight              = equateStraight(hand).pokerHand
  let isFlush                 = equateFlush(hand).pokerHand
  if (!(isStraight && isFlush)){ 
    return { highestHand: null, pokerHand: null };
  };
  let pokerHand = [];
  let straightHighCard = getStraightHighCard(hand.cardNumbers);
  let flushSuite = getFlushSuite(hand.cardSuites);
  let straightCardsToMatch = (straightHighCard === 1) ? [1, 10, 11, 12, 13] : [straightHighCard - 4, straightHighCard - 3, straightHighCard - 2, straightHighCard - 1, straightHighCard];
  let unsortedCards = hand.combo.filter((hand) => { 
    return (straightCardsToMatch.includes(hand.number) && hand.suite == flushSuite) 
  });
  if (unsortedCards.length === 5){
    pokerHand = sortPokerHand(unsortedCards);
    return { highestHand: 'Straight Flush', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
})