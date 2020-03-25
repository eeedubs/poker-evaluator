const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand = [];
  for (let cardNumber of hand.comboNumbers){
    let fourOfAKindCards = hand.combo.filter(card => card.number === cardNumber);
    if (fourOfAKindCards.length === 4){
      fourOfAKindCards = sortHighToLow(fourOfAKindCards)
      let nextHighestCard = getHighestCardsWithExclusion(hand.combo, fourOfAKindCards, 1);
      pokerHand = fourOfAKindCards.concat(nextHighestCard);
      return { highestHand: 'Four Of A Kind', pokerHand: pokerHand }
    }
  }
  return { highestHand: null, pokerHand: null };
});