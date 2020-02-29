module.exports = ((self) => {
  let pokerHand = [];
  let allPossibleStraightCards = [];
  // ace high straight
  let isAceHighStraight = [1, 10, 11, 12, 13].every(val => self.cardNumbers.includes(val));
  if (isAceHighStraight){
    allPossibleStraightCards = self.combo.filter((card) => { return [1, 10, 11, 12, 13].includes(card.number) });
    pokerHand = self.pickFiveHighestCardsFromStraight(allPossibleStraightCards);
    self.assignBestFive(pokerHand);
    self.highestHand = 'Straight'
    return true;
  };

  // normal straight
  for (let startCard of self.cardNumbers){
    if (startCard + 4 > 13){ return false }
    let straightSequence = [startCard, startCard + 1, startCard + 2, startCard + 3, startCard + 4]
    // It is a straight if: 
    //  - every number in the straight sequence is in the combo, and 
    //  - if the starting card is not an ace
    let isAStraight = (straightSequence.every(val => self.cardNumbers.includes(val)) && startCard !== 1)
    if (isAStraight){
      // Get all qualifying numbers that match the straight sequence
      allPossibleStraightCards = self.combo.filter((val) => { return straightSequence.includes(val.number) })
    }
  }

  if (allPossibleStraightCards.length >= 5){
    pokerHand = self.pickFiveHighestCardsFromStraight(allPossibleStraightCards);
    self.assignBestFive(pokerHand);
    self.highestHand = 'Straight'
    return true;
  }

  return false;
});