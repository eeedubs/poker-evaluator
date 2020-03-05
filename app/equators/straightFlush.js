const { getStraightHighCard, getFlushSuite } = require('./helpers/index');
const { equateStraight, equateFlush } = require('./index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let isStraight              = equateStraight(combo, cardNumbers, cardSuites).pokerHand
  let isFlush                 = equateFlush(combo, cardNumbers, cardSuites).pokerHand
  if (!(isStraight && isFlush)){ 
    return { highestHand: null, pokerHand: null };
  };
  let pokerHand               = [];
  let straightHighCard        = getStraightHighCard(cardNumbers);
  let flushSuite              = getFlushSuite(cardSuites);
  let straightCardsToMatch    = (straightHighCard === 1) ? [1, 10, 11, 12, 13] : [straightHighCard - 4, straightHighCard - 3, straightHighCard - 2, straightHighCard - 1, straightHighCard];
  let straightFlushCards      = combo.filter((val) => { 
    return (straightCardsToMatch.includes(val.number) && val.suite == flushSuite) 
  });
  if (straightCards.length === 5){
    pokerHand = straightFlushCards;
    return { highestHand: 'Straight Flush', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
})