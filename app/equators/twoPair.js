const { getHighestCardsWithExclusion } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand   = [];
  let pairs       = [];
  for (let number of cardNumbers) {
    let occurrences = cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
    
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
      let pairCards       = combo.filter(val => twoHighestPairValues.includes(val.number))
      let nextHighestCard = getHighestCardsWithExclusion(combo, pairCards, 1);
      pokerHand           = pairCards.concat(nextHighestCard);
    } else {
      let pairCards       = combo.filter(val => [pairs[0], pairs[1]].includes(val.number))
      let nextHighestCard = getHighestCardsWithExclusion(combo, pairCards, 1);
      pokerHand           = pairCards.concat(nextHighestCard);
    }
    return { highestHand: 'Two Pair', pokerHand: pokerHand };
  }
  return false;
});
