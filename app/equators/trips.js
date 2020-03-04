const { getNextHighestCards } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand     = [];
  let trips         = [];
  for (let number of cardNumbers){
    let occurrences = cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;

    if (occurrences === 3 && !trips.includes(number)){
      trips.push(number)
    }
  }
  
  if (trips.length === 1){  
    let tripCards       = combo.filter(card => card.number === trips[0])
    let remainingCards  = getNextHighestCards(combo, tripCards, 2);
    pokerHand           = tripCards.concat(remainingCards);
    return { highestHand: 'Trips', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});