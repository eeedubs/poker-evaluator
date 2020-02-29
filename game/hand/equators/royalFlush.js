module.exports = ((self) => {
  if (!self.isStraightFlush) { return false };
  let pokerHand = [];
  if (self.straightHighCard === 1){
    let flushSuite = self.flushSuite;
    pokerHand = self.combo.filter((card) => { 
      return ([1, 10, 11, 12, 13].includes(card.number) && card.suite == flushSuite) 
    });
    self.assignBestFive(pokerHand);
    self.highestHand = 'Royal Flush'
    return true;
  }
  return false;
});