const getHighestCardAmongstDuplicateNumbers   = require('./getHighestCardAmongstDuplicateNumbers');

module.exports = ((straightCards) => {
  let fiveHighestStraightCards = []
  for (let x = 0; x < straightCards.length; x++){
    let straightCardEntries   = fiveHighestStraightCards.map((card) => { return card.number })
    let cardNumberValue       = straightCards[x].number
    // Pool together possible duplicates for each card number
    let possibleDuplicates    = straightCards.filter(card => card.number === cardNumberValue)
    if (possibleDuplicates.length >= 2){
      // pick the highest card amongst the numbers
      let highestCard = getHighestCardAmongstDuplicateNumbers(possibleDuplicates, 1);
      if (!straightCardEntries.includes(highestCard.number)){
        fiveHighestStraightCards.concat(highestCard);
      }
    } else {
      fiveHighestStraightCards.push(straightCards[x])
    }
  }
  return fiveHighestStraightCards
});
