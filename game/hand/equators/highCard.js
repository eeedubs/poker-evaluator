module.exports = ((self) => {
  let pokerHand = self.getHighestCardsOutsideRemainingSet([], 5);
  self.assignBestFive(pokerHand);
  self.highestHand = 'High Card';
  return true;
});