const { sortHighToLow } = require('../helpers/index');

module.exports = ((hand) => {
  if (!hand.combo){ return { highestHand: null, pokerHand: null } };
  let pokerHand = [];
  for (let cardSuite of hand.comboSuites){
    let sameSuiteCards = hand.combo.filter(card => card.suite === cardSuite);
    if (sameSuiteCards.length >= 5){
      pokerHand = sortHighToLow(sameSuiteCards).slice(0, 5);
      return { highestHand: 'Flush', pokerHand: pokerHand };
    }
  }
  return { highestHand: null, pokerHand: null };
});
