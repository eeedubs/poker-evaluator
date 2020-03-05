module.exports = ((combo, cardsToIgnore, numberToKeep) => {
  const suiteValues = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  let remainingCards = combo.filter((card) => { return !cardsToIgnore.includes(card) });
  let sortedByValue = remainingCards.sort((a, b) => {
    if (a.number !== 1 && b.number === 1){
      return 1;
    } else if (a.number === 1 && b.number !== 1){
      return -1;
    } else if (a.number < b.number){
      return 1;
    } else if (a.number > b.number){
      return -1;
    } else {
      if (suiteValues.indexOf(a.suite) < suiteValues.indexOf(b.suite)){
        return 1;
      } else {
        return -1;
      }
    }
  });
  return sortedByValue.slice(0, numberToKeep);
});