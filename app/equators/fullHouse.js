module.exports = ((combo, cardNumbers, cardSuites) => {
  const suiteValues = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  let pokerHand = [];
  let pairs = [], trips = [];
  let fullHouseCards = [];
  for (let number of cardNumbers){
    let occurrences = cardNumbers.filter(val => val === number).length;

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
        let higherTripCards = combo.filter((card) => { return card.number === higherTripNumberValue });
        let lowerTripCards = combo.filter((card) => { return card.number === lowerTripNumberValue });
        let bestTwoOfLowerTripCards = lowerTripCards.sort((a, b) => {
          if (suiteValues.indexOf(a.suite) < suiteValues.indexOf(b.suite)){
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
          fullHouseCards = combo.filter((card) => { return fullHouseValues.includes(card.number) })
          break;
        }
          // 1 trips with 1 pair 
        else {
          let fullHouseValues = [trips[0], pairs[0]];
          fullHouseCards = combo.filter((card) => { return fullHouseValues.includes(card.number) });
        }
      }
    };
  }

  if (fullHouseCards.length === 5){
    pokerHand = fullHouseCards
    return { highestHand: 'Full House', pokerHand: pokerHand }
  }
  return { highestHand: null, pokerHand: null };
});