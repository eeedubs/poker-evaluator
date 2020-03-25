const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let pokerHand = []; tripNumbers = [];
  for (let cardNumber of hand.comboNumbers){
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;
    if (occurrences === 3 && !tripNumbers.includes(cardNumber)){
      tripNumbers.push(cardNumber)
    }
  }
  
  if (tripNumbers.length === 1){  
    let tripCards       = hand.combo.filter(card => card.number === tripNumbers[0])
    let remainingCards  = getHighestCardsWithExclusion(hand.combo, tripCards, 2);
    pokerHand           = tripCards.concat(remainingCards);
    return { highestHand: 'Trips', pokerHand: pokerHand };
  }
  return { highestHand: null, pokerHand: null };
});