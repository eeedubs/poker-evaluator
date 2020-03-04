const { getStraightHighCard, getFlushSuite } = require('./helpers/index');
const equateStraightFlush = require('./straightFlush.js');

module.exports = ((combo, cardNumbers, cardSuites) => {
  if (equateStraightFlush(combo, cardNumbers, cardSuites).pokerHand === null) { 
    return { found: false } 
  };
  let pokerHand = [];
  let straightHighCard = getStraightHighCard(cardNumbers);
  let flushSuite = getFlushSuite(cardSuites);
  if (straightHighCard === 1){
    pokerHand = combo.filter((card) => { 
      return ([1, 10, 11, 12, 13].includes(card.number) && card.suite == flushSuite) 
    });
    return { highestHand: 'Royal Flush', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});