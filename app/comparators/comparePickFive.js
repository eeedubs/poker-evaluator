const fs = require('fs');
const sequences = fs.readFileSync('app/assets/sequences.txt', 'utf8')
const numberValues = JSON.parse(sequences)["numbers"];

module.exports = ((hands) => {
  let winners = [];
  // Loop through each of the 5 cards
  for (let i = 0; i < 5; i++){
    let highestNumberValue = -1;
    // Loop through each of the hands
    hands.forEach((hand) => {
      let currentNumberValue = numberValues.indexOf(hand.bestFiveCards[i].number)
      if (currentNumberValue > highestNumberValue){
        highestNumberValue = currentNumberValue;
        winners = [hand];
      } else if (currentNumberValue === highestNumberValue){
        winners.push(hand);
      }
    });
    if (winners.length === 1){
      return winners;
    };
    if (winners.length > 1){
      hands = winners;
    }
  };
  return winners;
});