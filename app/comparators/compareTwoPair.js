module.exports = ((hands, cb) => {
  hands.forEach((hand) => {
    let kickerNumber;
    hand.bestFiveCards.forEach((card) => {
      if (hand.bestFiveCards.filter(c => c.number === card.number).length === 1){
        kickerNumber = card.number;
      }
    });
    let kickerCard     = hand.bestFiveCards.filter(card => card.number === kickerNumber);
    let remainingCards = hand.bestFiveCards.filter(card => card.number !== kickerNumber);
    hand.bestFiveCards = remainingCards.concat(kickerCard);
  });

  return cb(hands);
});