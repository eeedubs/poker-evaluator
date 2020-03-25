const { getHighestCardsWithExclusion, sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let numberSequence = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];
  let pokerHand = [], pairNumbers = [], tripNumbers = [];
  for (let cardNumber of hand.comboNumbers){
    let occurrences = hand.combo.filter(card => card.number === cardNumber).length;

    // Possibilities: [trips, trips], [trips, pair], [quads, trips], [quads, pair]
    if (occurrences === 3 && !tripNumbers.includes(cardNumber) && !pairNumbers.includes(cardNumber)){
      tripNumbers.push(cardNumber);
    }
    if (occurrences === 2 && !pairNumbers.includes(cardNumber)){
      pairNumbers.push(cardNumber);
    }
  }

  //  2 trips
  if (tripNumbers.length === 2){
    let higherTripNumber        = (numberSequence.indexOf(tripNumbers[0]) > numberSequence.indexOf(tripNumbers[1])) ?
      tripNumbers[0] : tripNumbers[1];
    let lowerTripNumber         = (higherTripNumber === tripNumbers[0]) ? tripNumbers[1] : tripNumbers[0];
    let higherTripCards         = hand.combo.filter((card) => { return card.number === higherTripNumber });
    let lowerTripCards          = hand.combo.filter((card) => { return card.number === lowerTripNumber });
    let bestTwoOfLowerTripCards = sortHighToLow(lowerTripCards).slice(0, 2);
    pokerHand                   = higherTripCards.concat(bestTwoOfLowerTripCards);
  } else if (tripNumbers.length === 1 && pairNumbers.length >= 1){
    // 1 trips
    let tripsNumber = tripNumbers[0];
    let tripCards   = hand.combo.filter(card => card.number === tripsNumber);
    let pairCards;
    
    if (pairNumbers.length === 2){
      //  1 trips with 2 pairs 
      let higherPairNumber  = (numberSequence.indexOf(pairNumbers[0]) > numberSequence.indexOf(pairNumbers[1])) ?
        pairNumbers[0] : pairNumbers[1]
      pairCards             = hand.combo.filter(card => card.number === higherPairNumber);
    } else {
      // 1 trips with 1 pair
      let pairNumber = pairNumbers[0];
      pairCards      = hand.combo.filter(card => card.number === pairNumber);
    }

    tripCards = sortHighToLow(tripCards);
    pairCards = sortHighToLow(pairCards);
    pokerHand = tripCards.concat(pairCards);
  }
  
  if (pokerHand.length === 5){
    return { highestHand: 'Full House', pokerHand: pokerHand }
  }

  return { highestHand: null, pokerHand: null };
});