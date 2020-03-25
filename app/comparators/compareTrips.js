module.exports = ((hands, cb) => {
  hands.forEach((hand) => {
    let tripNumber;
    hand.bestFiveCards.forEach((card) => {
      if (hand.bestFiveCards.filter(c => c.number === card.number).length === 3){
        tripNumber = card.number;
      }
    })
    let tripCards       = hand.bestFiveCards.filter(card => card.number === tripNumber);
    let remainingCards  = hand.bestFiveCards.filter(card => card.number !== tripNumber);
    hand.bestFiveCards  = tripCards.concat(remainingCards);
  });

  return cb(hands);
});