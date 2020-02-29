module.exports = ((self) => {
  let pokerHand = [];
  let pairs = [], trips = [];
  for (let number of self.cardNumbers){
    let occurrences = self.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
    // Four of a kind, divert to equateFourOfAKind() logic
    if (occurrences === 4){
      return true;
    }
    if (occurrences === 3 && !trips.includes(number) && !pairs.includes(number)){
      trips.push(number)
      // full house, divert to equateFullHouse() logic
      if (trips.length === 2){ 
        return true 
      } 
    }
    if (occurrences === 2 && !pairs.includes(number)){
      pairs.push(number);
      // full house, divert to equateFullHouse() logic
      if (trips.length >= 1 && pairs.length >= 1){
        return true
      }
    }
  }
  
  if (trips.length === 1 && pairs.length === 0){  
    let tripCards = self.combo.filter(card => card.number === trips[0])
    let remainingCards = self.getHighestCardsOutsideRemainingSet(tripCards, 2);
    pokerHand = tripCards.concat(remainingCards);
    self.assignBestFive(pokerHand);
    self.highestHand = 'Trips'
    return true;
  }
  return false;
});