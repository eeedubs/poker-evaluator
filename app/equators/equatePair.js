const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand = [], pairNumbers = [];

  for (let cardNumber of hand.comboNumbers) {
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;

    if (occurrences === 2 && !pairNumbers.includes(cardNumber)){
      pairNumbers.push(cardNumber)
    }
  }
  if (pairNumbers.length === 1){
    let pairCards       = hand.combo.filter(card => card.number === pairNumbers[0])
    let remainingCards  = getHighestCardsWithExclusion(hand.combo, pairCards, 3);
    remainingCards      = sortHighToLow(remainingCards);
    pokerHand           = pairCards.concat(remainingCards);
    return { highestHand: 'Pair', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});