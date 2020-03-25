module.exports = ((cards) => {
  const suiteValues = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
  return cards.sort((a, b) => {
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
});