const { getNextHighestCards } = require('./helpers/index');

module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = [];
  for (let cardNumber of cardNumbers){
    let occurrences = cardNumbers.filter((val) => { return val === cardNumber }).length;
    if (occurrences === 4){
      let fourOfAKindCards = combo.filter((val) => { return (val.number === cardNumber) })
      let nextHighestCard = getNextHighestCards(combo, fourOfAKindCards, 1);
      pokerHand = fourOfAKindCards.concat(nextHighestCard);
      return { highestHand: 'Four Of A Kind', pokerHand: pokerHand }
    }
  }
  return { highestHand: null, pokerHand: null };
});