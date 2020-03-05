const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = [];
  for (let cardNumber of cardNumbers){
    let fourOfAKindCards = combo.filter(val => val.number === cardNumber);
    if (fourOfAKindCards.length === 4){
      let nextHighestCard = getHighestCardsWithExclusion(combo, fourOfAKindCards, 1);
      let unsortedCards = fourOfAKindCards.concat(nextHighestCard);
      pokerHand = sortPokerHand(unsortedCards);
      return { highestHand: 'Four Of A Kind', pokerHand: pokerHand }
    }
  }
  return { highestHand: null, pokerHand: null };
});