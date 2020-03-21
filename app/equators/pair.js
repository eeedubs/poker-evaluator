const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand = [];
  let pairs = [];
  for (let cardNumber of hand.cardNumbers) {
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;

    if (occurrences === 2 && !pairs.includes(cardNumber)){
      pairs.push(cardNumber)
    }
  }
  if (pairs.length === 1){
    let pairCards = hand.combo.filter(card => card.number === pairs[0])
    let remainingCards = getHighestCardsWithExclusion(hand.combo, pairCards, 3);
    let unsortedCards = pairCards.concat(remainingCards);
    pokerHand = sortPokerHand(unsortedCards);
    return { highestHand: 'Pair', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});