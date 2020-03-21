const { sortPokerHand } = require('./helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand = [];
  for (let cardSuite of hand.cardSuites){
    let sameSuiteCards = hand.combo.filter(card => card.suite === cardSuite);
    if (sameSuiteCards.length >= 5){
      let unsortedCards= sameSuiteCards.sort((a, b) => { 
        if ((a.number < b.number && a.number !== 1) || (b.number === 1)){
          return 1;
        } else {
          return -1;
        }
      }).slice(0, 5);
      pokerHand = sortPokerHand(unsortedCards);
      return { highestHand: 'Flush', pokerHand: pokerHand };
    }
  }
  return { highestHand: null, pokerHand: null };
});
