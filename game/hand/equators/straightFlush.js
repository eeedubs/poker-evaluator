module.exports = ((self) => {
  if (!(self.isStraight && self.isFlush)){ return false };
  let pokerHand = [];
  let highCard = self.straightHighCard;
  let flushSuite = self.flushSuite;
  let straightCardsToMatch = (highCard === 1) ? [1, 10, 11, 12, 13] : [highCard - 4, highCard - 3, highCard - 2, highCard - 1, highCard];
  let straightFlushCards = self.combo.filter((val) => { 
    return (straightCardsToMatch.includes(val.number) && val.suite == flushSuite) 
  });
  let isStraightFlush = (straightFlushCards.length === 5)
  if (isStraightFlush){
    pokerHand = straightFlushCards;
    self.highestHand = 'Straight Flush'
    self.assignBestFive(pokerHand);
    return true;
  }
  return false;
})