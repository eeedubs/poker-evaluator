const sortHighToLow = require('./sortHighToLow');

module.exports = ((combo, cardsToIgnore, numberToKeep) => {
  let sortedCombo              = sortHighToLow(combo);
  let sortedComboWithExclusion = sortedCombo.filter(card => !cardsToIgnore.includes(card));
  return sortedComboWithExclusion.slice(0, numberToKeep);
});