const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = [];
  for (let cardNumber of cardNumbers){
    let occurrences = cardNumbers.filter((val) => { return val === cardNumber }).length;
    if (occurrences === 4){
      let fourOfAKindCards = combo.filter((val) => { return (val.number === cardNumber) })
      let nextHighestCard = getHighestCardsWithExclusion(combo, fourOfAKindCards, 1);
      let unsortedCards = fourOfAKindCards.concat(nextHighestCard);
      pokerHand = sortPokerHand(unsortedCards);
      return { highestHand: 'Four Of A Kind', pokerHand: pokerHand }
    }
  }
  return { highestHand: null, pokerHand: null };
});