module.exports = ((hands, cb) => {
  hands.forEach((hand) => {
    // if [1] === [2], then it's trips high
    // else, it's pair high
    let tripNumber = (hand.bestFiveCards[1].number === hand.bestFiveCards[2].number) ? 
      hand.bestFiveCards[2].number : hand.bestFiveCards[3].number;
    
    let pairNumber = (hand.bestFiveCards[1].number === hand.bestFiveCards[2].number) ? 
      hand.bestFiveCards[3].number : hand.bestFiveCards[2].number;

    let tripCards = hand.bestFiveCards.filter(card => card.number === tripNumber);
    let pairCards = hand.bestFiveCards.filter(card => card.number === pairNumber);
    hand.bestFiveCards = tripCards.concat(pairCards);
  });

  return cb(hands);
});