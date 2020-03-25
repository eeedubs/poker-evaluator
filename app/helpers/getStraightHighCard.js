module.exports = ((comboNumbers) => {
  let isAceHighStraight = [1, 10, 11, 12, 13].every(val => comboNumbers.includes(val));
  if (isAceHighStraight){ return 1 };
  let straightHighCard;
  for (let i = 0; i < comboNumbers.length; i++){
    let startCard = comboNumbers[i];
    let straightSequence = [startCard, startCard + 1, startCard + 2, startCard + 3, startCard + 4]
    let isAStraight = (straightSequence.every((val) => { return comboNumbers.includes(val) }) && startCard !== 1)
    if (isAStraight){
      straightHighCard = comboNumbers[i+4];
    }
  }
  return straightHighCard;
});