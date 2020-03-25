const fs = require('fs');
const sequences = fs.readFileSync('app/assets/sequences.txt', 'utf8')
const suiteValues = JSON.parse(sequences)["suites"];
const numberValues = JSON.parse(sequences)["numbers"];

module.exports = ((cards) => {
  return cards.sort((a, b) => {
    if (numberValues.indexOf(a.number) < numberValues.indexOf(b.number)){
      return 1;
    } else if (numberValues.indexOf(a.number) > numberValues.indexOf(b.number)){
      return -1;
    } else {
      if (suiteValues.indexOf(a.suite) < suiteValues.indexOf(b.suite)){
        return 1;
      } else {
        return -1;
      }
    }
  });
});