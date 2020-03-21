const { getHighestCardsWithExclusion, sortPokerHand } = require('./helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand     = [];
  let trips         = [];
  for (let cardNumber of hand.cardNumbers){
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;

    if (occurrences === 3 && !trips.includes(cardNumber)){
      trips.push(cardNumber)
    }
  }
  
  if (trips.length === 1){  
    let tripCards       = hand.combo.filter(card => card.number === trips[0])
    let remainingCards  = getHighestCardsWithExclusion(hand.combo, tripCards, 2);
    let unsortedCards   = tripCards.concat(remainingCards);
    pokerHand = sortPokerHand(unsortedCards);
    return { highestHand: 'Trips', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});