const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let pokerHand = []; unsortedCards = []; pairs = [];
  for (let cardNumber of hand.comboNumbers) {
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;
    if (occurrences === 2 && !pairs.includes(cardNumber)){
      pairs.push(cardNumber)
    }
  }

  let allPairCards  = hand.combo.filter(card => pairs.includes(card.number));
  let pairCards = []; nextHighestCard = [];
  if (allPairCards.length >= 4){
    pairCards       = sortHighToLow(allPairCards).slice(0, 4);
    nextHighestCard = getHighestCardsWithExclusion(hand.combo, pairCards, 1);
    pokerHand       = pairCards.concat(nextHighestCard);
    return { highestHand: 'Two Pair', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});
