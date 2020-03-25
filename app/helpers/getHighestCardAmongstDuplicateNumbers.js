module.exports = ((duplicateCards, numberToKeep) => {
  const suiteValues = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];

  if (duplicateCards.length === 1 ){ return duplicateCards };

  return duplicateCards.sort((a, b) => {
    if (suiteValues.indexOf(a.suite) < suiteValues.indexOf(b.suite)){
      return 1;
    } else {
      return -1;
    }
  }).slice(0, numberToKeep);
});