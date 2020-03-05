const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = [];
  let pairs = [];
  for (let cardNumber of cardNumbers) {
    let occurrences = combo.filter(val => val.number === cardNumber).length;

    if (occurrences === 2 && !pairs.includes(cardNumber)){
      pairs.push(cardNumber)
    }
  }
  if (pairs.length === 1){
    let pairCards = combo.filter(val => val.number === pairs[0])
    let remainingCards = getHighestCardsWithExclusion(combo, pairCards, 3);
    let unsortedCards = pairCards.concat(remainingCards);
    pokerHand = sortPokerHand(unsortedCards);
    return { highestHand: 'Pair', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});