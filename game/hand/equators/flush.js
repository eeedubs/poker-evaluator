module.exports = ((self) => {
  let pokerHand = [];
  for (let suite of self.cardSuites){
    let occurrences = self.cardSuites.filter((val, i, arr) => { return arr[i] === suite }).length;
    if (occurrences >= 5){
      let allFlushCards = self.combo.filter((card) => { return card.suite === suite });
      //  take the best five cards from the suite
      pokerHand = allFlushCards.sort((a, b) => { 
        if ((a.number < b.number && a.number !== 1) || (b.number === 1)){
          return 1;
        } else {
          return -1;
        }
      }).slice(0, 5);
      self.assignBestFive(pokerHand);
      self.highestHand = 'Flush'
      return true;
    }
  }
  return false;
});
