module.exports = ((hands, cb) => {
  hands.forEach((hand) => {
    let pairNumber;
    hand.bestFiveCards.forEach((card) => {
      if (hand.bestFiveCards.filter(c => c.number === card.number).length === 2){
        pairNumber = card.number;
      }
    })
    let pairCards       = hand.bestFiveCards.filter(card => card.number === pairNumber);
    let remainingCards  = hand.bestFiveCards.filter(card => card.number !== pairNumber);
    hand.bestFiveCards  = pairCards.concat(remainingCards);
  });

  return cb(hands);
});