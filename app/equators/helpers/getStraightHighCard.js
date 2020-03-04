module.exports = ((cardNumbers) => {
  let isAceHighStraight = [1, 10, 11, 12, 13].every(val => cardNumbers.includes(val));
  if (isAceHighStraight){ return 1 };
  let straightHighCard;
  for (let i = 0; i < cardNumbers.length; i++){
    let startCard = cardNumbers[i];
    let straightSequence = [startCard, startCard + 1, startCard + 2, startCard + 3, startCard + 4]
    let isAStraight = (straightSequence.every((val) => { return cardNumbers.includes(val) }) && startCard !== 1)
    if (isAStraight){
      straightHighCard = cardNumbers[i+4];
    }
  }
  return straightHighCard;
});