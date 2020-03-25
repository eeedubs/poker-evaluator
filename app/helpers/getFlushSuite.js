
module.exports = ((cardSuites) => {
  for (let suite of cardSuites){
    let occurrences = cardSuites.filter((val, i, arr) => { return arr[i] === suite }).length;
    if (occurrences >= 5){
      return suite
    }
  }
});