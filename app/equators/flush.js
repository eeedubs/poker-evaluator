module.exports = ((combo, cardNumbers, cardSuites) => {
  let pokerHand = [];
  for (let cardSuite of cardSuites){
    let sameSuiteCards = combo.filter((card, i, arr) => { return card.suite === cardSuite });
    if (sameSuiteCards.length >= 5){
      pokerHand = sameSuiteCards.sort((a, b) => { 
        if ((a.number < b.number && a.number !== 1) || (b.number === 1)){
          return 1;
        } else {
          return -1;
        }
      }).slice(0, 5);
      return { highestHand: 'Flush', pokerHand: pokerHand };
    }
  }
  return { highestHand: null, pokerHand: null };
});
