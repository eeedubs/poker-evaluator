const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand     = [];
  let unsortedCards = []
  let pairs         = [];
  for (let cardNumber of hand.cardNumbers) {
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;
    
    if (occurrences === 2 && !pairs.includes(cardNumber)){
      pairs.push(cardNumber)
    }
  }
  if (pairs.length >= 2){
    if (pairs.length === 3){
      let twoHighestPairValues = pairs.sort((a, b) => { 
        if ((a < b) || (b === 1 && a !== 1)){
          return 1;
        } else {
          return -1;
        }
      }).slice(0, 2);
      let pairCards = hand.combo.filter(card => twoHighestPairValues.includes(card.number))
      let nextHighestCard = getHighestCardsWithExclusion(hand.combo, pairCards, 1);
      unsortedCards = pairCards.concat(nextHighestCard);
    } else {
      let pairCards = hand.combo.filter(card => [pairs[0], pairs[1]].includes(card.number))
      let nextHighestCard = getHighestCardsWithExclusion(hand.combo, pairCards, 1);
      unsortedCards = pairCards.concat(nextHighestCard);
    }
    pokerHand = sortPokerHand(unsortedCards);
    return { highestHand: 'Two Pair', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});
