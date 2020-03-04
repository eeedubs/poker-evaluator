const { getNextHighestCards } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = [];
  let pairs = [];
  for (let number of cardNumbers) {
    let occurrences = cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;

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
    let pairCards = combo.filter(val => val.number === pairs[0])
    let remainingCards = getNextHighestCards(combo, pairCards, 3);
    pokerHand = pairCards.concat(remainingCards);
    return { highestHand: 'Pair', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});