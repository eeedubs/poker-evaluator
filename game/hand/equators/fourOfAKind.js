module.exports = ((self) => {
  let pokerHand = [];
  for (let cardNumber of self.cardNumbers){
    let occurrences = self.cardNumbers.filter((val) => { return val === cardNumber }).length;
    if (occurrences === 4){
      let fourOfAKindCards = self.combo.filter((val) => { return (val.number === cardNumber) })
      let nextHighestCard = self.getHighestCardsOutsideRemainingSet(fourOfAKindCards, 1);
      pokerHand = fourOfAKindCards.concat(nextHighestCard);
      self.assignBestFive(pokerHand);
      self.highestHand = 'Four Of A Kind'
      return true;
    }
  }
  return false;
});