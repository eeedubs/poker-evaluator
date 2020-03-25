const {
  compareFourOfAKind, 
  compareFullHouse, 
  comparePair, 
  compareTrips, 
  compareTwoPair,
  comparePickFive
} = require('./index');

module.exports = ((hands, pokerHandType) => {
  switch(pokerHandType){ 
    case("Royal Flush"):
      return comparePickFive(hands);
    case("Straight Flush"):
      return comparePickFive(hands);
    case("Four Of A Kind"):
      return compareFourOfAKind(hands, comparePickFive);
    case("Full House"):
      return compareFullHouse(hands, comparePickFive);
    case("Flush"):
      return comparePickFive(hands);
    case("Straight"):
      return comparePickFive(hands);
    case("Trips"):
      return compareTrips(hands, comparePickFive);
    case("Two Pair"):
      return compareTwoPair(hands, comparePickFive);
    case("Pair"):
      return comparePair(hands, comparePickFive);
    default:
      return comparePickFive(hands);
  }
});
