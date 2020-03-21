const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand = [];
  for (let cardNumber of hand.cardNumbers){
    let fourOfAKindCards = hand.combo.filter(card => card.number === cardNumber);
    if (fourOfAKindCards.length === 4){
      let nextHighestCard = getHighestCardsWithExclusion(hand.combo, fourOfAKindCards, 1);
      let unsortedCards = fourOfAKindCards.concat(nextHighestCard);
      pokerHand = sortPokerHand(unsortedCards);
      return { highestHand: 'Four Of A Kind', pokerHand: pokerHand }
    }
  }
  return { highestHand: null, pokerHand: null };
});