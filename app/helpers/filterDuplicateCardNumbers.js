const sortHighToLow = require('./sortHighToLow');

module.exports = ((straightCards) => {
  let allStraightCards          = sortHighToLow(straightCards);
  let fiveHighestStraightCards  = [];
  for (let card of allStraightCards){
    let straightNumbersAccountedFor = fiveHighestStraightCards.map(card => card.number);
    // If the card number hasn't been added yet, add it.
    // This approach, due to the sorting from highest to lowest, will ensure that only the highest
    // value duplicate will be added.
    if (!straightNumbersAccountedFor.includes(card.number)){
      fiveHighestStraightCards.push(card);
    }
  }
  return fiveHighestStraightCards;
});
