module.exports = ((self) => {
  let pokerHand = [];
  let pairs = [];
  for (let number of self.cardNumbers) {
    let occurrences = self.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
    
    //  trips or four of a kind
    if ([3, 4].includes(occurrences)){ 
      return true;
    }
    if (occurrences === 2 && !pairs.includes(number)){
      pairs.push(number)
    }
  }
  if (pairs.length >= 2){
    if (pairs.length === 3){
      let twoHighestPairValues = pairs.sort((a, b) => { 
        if (a < b && a !== 1){
          return 1;
        } else {
          return -1;
        }
      }).slice(0, 2);
      let pairCards = self.combo.filter(val => twoHighestPairValues.includes(val.number))
      let nextHighestCard = self.getHighestCardsOutsideRemainingSet(pairCards, 1);
      pokerHand = pairCards.concat(nextHighestCard);
    } else {
      let pairCards = self.combo.filter(val => [pairs[0], pairs[1]].includes(val.number))
      let nextHighestCard = self.getHighestCardsOutsideRemainingSet(pairCards, 1);
      pokerHand = pairCards.concat(nextHighestCard);
    }
    self.assignBestFive(pokerHand);
    self.highestHand = 'Two Pair'
    return true;
  }
  return false;
});
