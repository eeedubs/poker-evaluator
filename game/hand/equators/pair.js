module.exports = ((self) => {
  let pokerHand = [];
  let pairs = [];
  for (let number of self.cardNumbers) {
    let occurrences = self.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;

    // divert to equateTrips() or equateFourOfAKind()
    if ([3, 4].includes(occurrences)){ 
      return true;
    }

    if (occurrences === 2 && !pairs.includes(number)){
      pairs.push(number)

      //  divert to equateTwoPair()
      if (pairs.length >= 2){
        return true;
      }
    }
  }
  if (pairs.length === 1){
    let pairCards = self.combo.filter(val => val.number === pairs[0])
    let remainingCards = self.getHighestCardsOutsideRemainingSet(pairCards, 3);
    pokerHand = pairCards.concat(remainingCards);
    self.assignBestFive(pokerHand);
    self.highestHand = 'Pair'
    return true;
  }
  return false;
});