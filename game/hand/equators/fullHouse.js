module.exports = ((self) => {
  if (!self.isTrips) { return false };
  let pokerHand = [];
  let pairs = [], trips = [];
  let fullHouseCards = [];
  for (let number of self.cardNumbers){
    let occurrences = self.cardNumbers.filter(val => val === number).length;
    
    // divert to equateFourOfAKind()
    if (occurrences === 4){
      return true;
    }

    // Possibilities: [trips, trips], [trips, pair], [quads, trips], [quads, pair]
    if (occurrences === 3 && !trips.includes(number) && !pairs.includes(number)){
      trips.push(number);
    }
    if (occurrences === 2 && !pairs.includes(number)){
      pairs.push(number);
    }

    let isFullHouse = ((trips.length === 2) || (trips.length === 1 && pairs.length >= 1)) 
    if (isFullHouse){
      //  2 trips
      if (trips.length === 2){
        let higherTripNumberValue = ((trips[0] > trips[1] && trips[1] !== 1) || trips[0] === 1) ? trips[0] : trips[1];
        let lowerTripNumberValue = trips.filter((val) => { return val !== higherTripNumberValue });
        let higherTripCards = self.combo.filter((card) => { return card.number === higherTripNumberValue });
        let lowerTripCards = self.combo.filter((card) => { return card.number === lowerTripNumberValue });
        let bestTwoOfLowerTripCards = lowerTripCards.sort((a, b) => {
          if (self.suiteValue.indexOf(a.suite) < self.suiteValue.indexOf(b.suite)){
            return 1;
          } else {
            return -1;
          }
        }).slice(0, 2);
        fullHouseCards = higherTripCards.concat(bestTwoOfLowerTripCards);
        break;
      } 
      else {
      //  1 trips with 2 pairs 
        if (pairs.length === 2){
          let higherPairNumberValue = ((pairs[0] > pairs[1] && pairs[1] !== 1) || pairs[0] === 1) ? pairs[0] : pairs[1];
          let fullHouseValues = [trips[0], higherPairNumberValue]
          fullHouseCards = self.combo.filter((card) => { return fullHouseValues.includes(card.number) })
          break;
        }
          // 1 trips with 1 pair 
        else {
          let fullHouseValues = [trips[0], pairs[0]];
          fullHouseCards = self.combo.filter((card) => { return fullHouseValues.includes(card.number) });
        }
      }
    };
  }

  if (fullHouseCards.length === 5){
    pokerHand = fullHouseCards
    self.assignBestFive(pokerHand);
    self.highestHand = 'Full House'
    return true;
  }
  return false;
});