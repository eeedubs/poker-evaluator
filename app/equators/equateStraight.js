const { filterStraightDuplicates } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  
  let pokerHand = []; allPossibleStraightCards = [];
  let isAceHighStraight         = [1, 10, 11, 12, 13].every(val => hand.comboNumbers.includes(val));
  // ace high straight
  if (isAceHighStraight){
    allPossibleStraightCards = hand.combo.filter((card) => { return [1, 10, 11, 12, 13].includes(card.number) });
  } else {
    // normal straight
    for (let startCard of hand.comboNumbers){
      if (startCard + 4 > 13){ 
        return { highestHand: null, pokerHand: null }
      };

      let straightSequence = [startCard, startCard + 1, startCard + 2, startCard + 3, startCard + 4]
      // It is a straight if: 
      //  - every number in the straight sequence is in the combo, and 
      //  - if the starting card is not an ace
      let isAStraight = (straightSequence.every(val => hand.comboNumbers.includes(val)) && startCard !== 1)
      if (isAStraight){
        // Get all qualifying numbers that match the straight sequence
        allPossibleStraightCards = hand.combo.filter((val) => { return straightSequence.includes(val.number) })
      }
    }
  }

  if (allPossibleStraightCards.length >= 5){
    pokerHand = filterStraightDuplicates(allPossibleStraightCards);
    return { highestHand: 'Straight', pokerHand: pokerHand };
  }

  return { highestHand: null, pokerHand: null };
});