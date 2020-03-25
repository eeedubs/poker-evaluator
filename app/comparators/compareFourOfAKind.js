module.exports = ((hands, cb) => {
  hands.forEach((hand) => {
    let quadNumber     = hand.bestFiveCards[2].number;
    let kickerNumber   = (hand.bestFiveCards[0].number === hand.bestFiveCards[1].number) ? hand.bestFiveCards[4].number : hand.bestFiveCards[0].number;
    let quadCards      = hand.bestFiveCards.filter(card => card.number === quadNumber);
    let kickerCard     = hand.bestFiveCards.filter(card => card.number === kickerNumber);
    hand.bestFiveCards = quadCards.concat(kickerCard);
  });

  return cb(hands);
});