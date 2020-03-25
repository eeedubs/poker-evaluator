const sortHighToLow = require('./sortHighToLow');

module.exports = ((straightCards) => {
  let allStraightCards          = sortHighToLow(straightCards);
  let fiveHighestStraightCards  = [];
  for (let card of allStraightCards){
    let straightNumbersAccountedFor = fiveHighestStraightCards.map(card => card.number);
    // Pool together possible duplicates for each card number
    let possibleDuplicates  = allStraightCards.filter(c => c.number === card.number);
    // If there are duplicates detected
    if (possibleDuplicates.length >= 2){
      // Since the numbers are sorted highest to lowest, only the highest duplicate will be added
      if (!straightNumbersAccountedFor.includes(card.number)){
        fiveHighestStraightCards.concat(card);
      }
      // add non-duplicates to the array
    } else {
      fiveHighestStraightCards.push(card);
    }
  }
  return fiveHighestStraightCards
});
