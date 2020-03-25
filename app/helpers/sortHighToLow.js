module.exports = ((cards) => {
  const suiteValues = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  const numberValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];
  return cards.sort((a, b) => {
    if (numberValues.indexOf(a.number) < numberValues.indexOf(b.number)){
      return 1;
    } else if (numberValues.indexOf(a.number) > numberValues.indexOf(b.number)){
      return -1;
    } else {
      if (suiteValues.indexOf(a.suite) < suiteValues.indexOf(b.suite)){
        return 1;
      } else {
        return -1;
      }
    }
  });
});