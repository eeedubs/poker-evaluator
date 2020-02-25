const prompt = require('prompt-sync')();
const _ = require("underscore");
const fs = require('fs');

const cards = fs.readFileSync('./cards.txt', 'utf8')

const line = "---------------------";
const RF = "RF";
const SF = "SF";
const FourK = "4K";
const FH = "FH";
const FL = "FL"
const ST = "ST";
const ThreeK = "3K";
const TwoK = "2K";
const HC = "HC";
const pokerHands = [RF, SF, FourK, FH, FL, ST, ThreeK, TwoK, HC]

class Game {
  constructor() {
    this.deck = new Deck(cards);
    this.hand = new Hand(this.deck);
  }
}

class Deck {
  constructor(source) {
    this.cards = this._fillDeck(source);
  }

  _fillDeck(source) {
    let deck = [];
    let lines = source.split(",\n");
    for (let line of lines){
      let parsedLine = JSON.parse(line);
      let number = parsedLine["Number"];
      let suite = parsedLine["Suite"];
      let newCard = new Card();
      newCard.assignNumber(number);
      newCard.assignSuite(suite);
      deck.push(newCard);
    }
    return deck;
  }
}

class Card {
  constructor() {
  }

  assignSuite(suite) {
    this.suite = suite;
  }

  assignNumber(number) {
    this.number = number;
  }
  
  drawRandom(deck) {
    let cardIndex = Math.floor(Math.random() * deck.cards.length);
    let card = deck.cards.splice(cardIndex, 1)[0];
    this.number = card.number;
    this.suite = card.suite;
  }
}

class Hand {
  constructor(deck) {
    this.cards = [];
    for (let i = 0; i < 5; i++){
      let newCard = new Card();
      newCard.drawRandom(deck);
      this.cards.push(newCard);
    }
    this.numbers = this.cards.map((card) => { return card.number }).sort((a, b) => { return a - b });
    this.suites = this.cards.map((card) => { return card.suite }).sort();
  }

  get highCard() {
    return this.numbers[4]
  }

  get highCardSuite() {
    let highCardIndex = this.cards.map((val, i) => { return val.number }).indexOf(this.highCard);
    return this.cards[highCardIndex].suite
  }

  isRoyalFlush() {
    if (!this.isStraightFlush()) { return false };
    return (this.numbers[0] === 1);
  }

  isStraightFlush() {
    return (this.isStraight() && this.isFlush())
  }

  isFourOfAKind() {
    let highKicker = this.numbers.slice(0, 4).every((val, i, arr) => { return val === arr[0]})
    let lowKicker = this.numbers.slice(1, 5).every((val, i, arr) => { return val === arr[1]})
    return (highKicker || lowKicker);
  }

  isFullHouse() {
    if (!this.isTrips()) { return false };
    let tripsHighTrips = this.numbers.slice(2, 5).every((val, i, arr) => { return val === arr[2]});
    let tripsHighPair = this.numbers.slice(0, 2).every((val, i, arr) => { return val === arr[0]});
    let tripsLowTrips = this.numbers.slice(3, 5).every((val, i, arr) => { return val === arr[3]});
    let tripsLowPair = this.numbers.slice(0, 3).every((val, i, arr) => { return val === arr[0]});
    let isTripsHighFullHouse = (tripsHighTrips && tripsHighPair);
    let isTripsLowFullHouse = (tripsLowTrips && tripsLowPair);
    return (isTripsHighFullHouse || isTripsLowFullHouse);
  }

  isFlush() {
    return (this.suites[0] === this.suites[4]);
  }

  isStraight() {
    let normalStraight = JSON.stringify([this.numbers[0], this.numbers[0] + 1, this.numbers[0] + 2, this.numbers[0] + 3, this.numbers[0] + 4])
    let aceHighStraight = JSON.stringify([1, 10, 11, 12, 13])
    let isNormalStraight = (normalStraight.includes(JSON.stringify(this.numbers)) && this.numbers[0] !== 1);
    let isAceHighStraight = (aceHighStraight.includes(JSON.stringify(this.numbers)))
    return (isNormalStraight || isAceHighStraight);
  }

  isTrips() {
    let lowTrips = this.numbers.slice(0, 3).every((val, i, arr) => { return val === arr[0] });
    let midTrips = this.numbers.slice(1, 4).every((val, i, arr) => { return val === arr[1] });
    let highTrips = this.numbers.slice(2, 5).every((val, i, arr) => { return val === arr[2] });
    return (lowTrips || midTrips || highTrips);
  }

  isTwoPair() {
    let pairs = [];
    for (let number of this.numbers) {
      let occurrences = this.numbers.filter((val, i, arr) => { return arr[i] === number }).length;
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number)
      }
    }
    return (pairs.length === 2);
  }

  isPair() {
    let pairs = [];
    for (let number of this.numbers) {
      let occurrences = this.numbers.filter((val, i, arr) => { return arr[i] === number }).length;
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number)
      }
    }
    return (pairs.length === 1);
  }
}

let game = new Game();
while (!game.hand.isPair()){
  game = new Game();
}
console.log(game.hand);

// returns an object of the occurrences of each number value
function occurrencesOfNumber(flop){
  let orderedFlop = sortByCardNumber(flop);
  let values = {};
  Object.keys(orderedFlop).map(function(card, index){
    if (values[orderedFlop[card].cardNumber]){
      values[orderedFlop[card].cardNumber] = values[orderedFlop[card].cardNumber] + 1;
    } else {
      values[orderedFlop[card].cardNumber] = 1;
    }
  });
  return values;
}

// returns an integer equal to the highest card's suite
function getHighSuiteByCardNumber(flop, cardInput){
  let highCardSuite = 0;
  Object.keys(flop).map(function(card, index){
    // for each card in the flop
    if (flop[card].cardNumber == cardInput){
      // if the card number matches the cardInput
      if (Number(flop[card].cardSuite) > highCardSuite){
        //  if the card number's suite is higher than the previous suite
        highCardSuite = Number(flop[card].cardSuite);
      }
    }
  })
  return highCardSuite;
}

// Sorts a hand object into [ PokerHand, highCard, highSuite, lowCard/null, lowSuite/null ]
function evaluateFlop(flop){
  if (isRoyalFlush(flop)[0]){
    return ["RF", isRoyalFlush(flop)[1], isRoyalFlush(flop)[2], null, null];
  } else if (isStraightFlush(flop)[0]){
    return ["SF", isStraightFlush(flop)[1], isStraightFlush(flop)[2], null, null];
  } else if (isPair(flop, 4)[0]){
    return ["4K", isPair(flop, 4)[1], isPair(flop, 4)[2], null, null];
  } else if (isFullHouse(flop)[0]){
    return ["FH", isFullHouse(flop)[1], isFullHouse(flop)[2], isFullHouse(flop)[3], isFullHouse(flop)[4]];
  } else if (isFlush(flop)[0]){
    return ["FL", isFlush(flop)[1], isFlush(flop)[2], null, null];
  } else if (isStraight(flop)[0]){
    return ["ST", isStraight(flop)[1], isStraight(flop)[2], null, null];
  } else if (isPair(flop, 3)[0]){
    return ["3K", isPair(flop, 3)[1], isPair(flop, 3)[2], null, null];
  } else if (isPair(flop, 2)[0]){
    return ["2K", isPair(flop, 2)[1], isPair(flop, 2)[2], null, null];
  } else {
    let values = sortByCardNumber(flop);
    let array = getNumberVals(values);
    let highCard = getHighCard(array);
    let highSuite = getHighSuiteByCardNumber(flop, highCard);
    return ["HC", highCard, highSuite, null, null]
  }
}

// Sorts RFs, SFs, FHs, FLs, and STs
function compareHands(hand1, hand2, condition){
  let result = [false, null, null];
  // if condition matches
  if (hand1[0] == condition && hand2[0] == condition){
    // if highCard matches
    if (hand1[1] == hand2[1]){
      // if highSuite matches
      if (hand1[2] == hand2[2]){
        // Royal Flush tie
        if (condition == RF){
          results = [true, "Tie", condition];
          // if lowCard matches
        } else if (hand1[3] == hand2[3]){
          // if lowSuite matches
          if (hand1[4] == hand2[4]){
            result = [true, "a tie", condition];
          } else if (hand1[4] > hand2[4]){
            result = [true, "Hand1", condition];
          } else {
            result = [true, "Hand2", condition];
          }
        } else if (hand1[3] > hand2[3]){
          result = [true, "Hand1", condition];
        } else {
          result = [true, "Hand2", condition];
        }
      } else if (hand1[2] > hand2[2]){
        result = [true, "Hand1", condition];
      } else {
        result = [true, "Hand2", condition];
      }
    } else if (hand1[1] == 1 && hand2[1] !== 1){
      result = [true, "Hand1", condition];
    } else if (hand2[1] == 1 && hand1[1] !== 1){
      result = [true, "Hand2", condition];
    } else if (hand1[1] > hand2[1]){
      result = [true, "Hand1", condition];
    } else {
      result = [true, "Hand2", condition];
    }
  } else if (hand1[0] == condition){
    result = [true, "Hand1", condition];
  } else if (hand2[0] == condition){
    result = [true, "Hand2", condition];
  }
  return result;
}

// Sorts 4Ks, 3Ks and 2Ks
function comparePairs(hand1, hand2, flop1, flop2, condition){
  let result = [false, null, null]
  let firstNumberOrder = sortByCardNumber(flop1)
  let firstSuiteOrder = sortBySuiteNumber(flop1)
  let secondNumberOrder = sortByCardNumber(flop2)
  let secondSuiteOrder = sortBySuiteNumber(flop2)
  let firstNumberArray = getNumberVals(firstNumberOrder);
  let firstSuiteArray = getSuiteVals(firstSuiteOrder);
  let secondNumberArray = getNumberVals(secondNumberOrder);
  let secondSuiteArray = getSuiteVals(secondSuiteOrder);
  // if both hands meet the condition
  if (hand1[0] == condition && hand2[0] == condition){
    // if pair number is equal
    if (hand1[1] == hand2[1]){
      // if pair suite is equal
      if (hand1[2] == hand2[2]){    
        for (let x = 4; x > -1; x--){
          if (firstNumberArray[x] == secondNumberArray[x]){
            if (x === 0 && firstSuiteArray[x] == secondSuiteArray[x]){
              result = [true, "a tie", condition];
            } else if (x !== 0 && firstSuiteArray[x] == secondSuiteArray[x]){
              continue
            } else if (firstSuiteArray[x] > secondSuiteArray[x]){
              result = [true, "Hand1", condition];
            } else {
              result = [true, "Hand2", condition];
            }
          } else if (firstNumberArray[x] == 1 && secondNumberArray[x] !== 1){
            result = [true, "Hand1", condition];
          } else if (secondNumberArray[x] == 1 && firstNumberArray[x] !== 1){
            result = [true, "Hand2", condition];
          } else if (firstNumberArray[x] > secondNumberArray[x]){
            result = [true, "Hand1", condition];
          } else {
            result = [true, "Hand2", condition];
          }
        }
        // else if suite is greater than
      } else if (hand1[2] > hand2[2]){
        result = [true, "Hand1", condition];
      } else {
        result = [true, "Hand2", condition];
      }
      // else if number is greater than
    } else if (hand1[1] == 1 && hand2[1] !== 1){
      result = [true, "Hand1", condition];
    } else if (hand2[1] == 1 && hand1[1] !== 1){
      result = [true, "Hand2", condition];
    } else if (hand1[1] > hand2[1]){
      result = [true, "Hand1", condition];
    } else {
      result = [true, "Hand2", condition];
    }
  } else if (hand1[0] == condition){
    result = [true, "Hand1", condition];
  } else if (hand2[0] == condition){
    result = [true, "Hand2", condition];
  }
  return result;
}

// Sorts HCs
function compareHighCard(flop1, flop2){
  let result = [false, null, null]
  let firstNumberOrder = sortByCardNumber(flop1)
  let firstSuiteOrder = sortBySuiteNumber(flop1)
  let secondNumberOrder = sortByCardNumber(flop2)
  let secondSuiteOrder = sortBySuiteNumber(flop2)
  let firstNumberArray = getNumberVals(firstNumberOrder);
  let firstSuiteArray = getSuiteVals(firstSuiteOrder);
  let secondNumberArray = getNumberVals(secondNumberOrder);
  let secondSuiteArray = getSuiteVals(secondSuiteOrder);
  if (firstNumberArray[0] == 1 && secondNumberArray[0] == 1){
    if (firstSuiteArray[0] > secondSuiteArray[0]){
      result = [true, "Hand1", HC];
    } else if (secondSuiteArray[0] > firstSuiteArray[0]){
      result = [true, "Hand2", HC];
    }
  } else if (firstNumberArray[0] == 1 && secondNumberArray[0] !== 1){
    result = [true, "Hand1", HC];
  } else if (secondNumberArray[0] == 1 && firstNumberArray[0] !== 1){
    result = [true, "Hand2", HC];
  } else {
    for (let x = 4; x > -1; x--){
      if (firstNumberArray[x] == secondNumberArray[x]){
        if (x === 0 && firstSuiteArray[x] == secondSuiteArray[x]){
          result = [true, "a tie", HC];
        } else if (x !== 0 && firstSuiteArray[x] == secondSuiteArray[x]){
          continue;
        } else if (firstSuiteArray[x] > secondSuiteArray[x]){
          result = [true, "Hand1", HC];
        } else {
          result = [true, "Hand2", HC];
        }
      } else if (firstNumberArray[x] > secondNumberArray[x]){
        result = [true, "Hand1", HC];
      } else {
        result = [true, "Hand2", HC];
      }
    }
  }
  return result;
}

// Runs the hands and flops through the different tests to determine the winner
function determineWinner(handResult1, handResult2, flop1, flop2){
  console.log("Flop1 \n ", flop1, "\n\nFlop2 \n", flop2, "\n");
  console.log("Hand1 \n ", handResult1, "\nHand2 \n", handResult2, "\n");
  let found = null;
  for (let hand of pokerHands){
    if (hand == HC){
      found = compareHighCard(flop1, flop2)
      return found;
    } else if (hand == FourK || hand == ThreeK || hand == TwoK){
      found = comparePairs(handResult1, handResult2, flop1, flop2, hand)
      if (found[0] == true){
        return found;
      }
    } else {
      found = compareHands(handResult1, handResult2, hand)
      if (found[0] == true){
        return found;
      }
    }
  }
}

// Tests for matching poker hands abbreviations (no pairs)
function oddsOfHand(phInput){
  let flop = createFlop(true);
  let ph = phInput;
  let count = 1;
  while (!_.contains(pokerHands, ph)){
    ph = prompt("Please enter a valid poker hand abbreviation (RF, SF, FourK, FH, FL, ST, ThreeK, TwoK or HC): ");
  }
  while(evaluateFlop(flop)[0] !== ph){
    count++;
    flop = createFlop(true);
  }
  console.log(flop);
  console.log(evaluateFlop(flop));
  console.log("Decks dealt: ", count);
}

// Repeatedly creates a new flop until a specified pokerhand is matched (no pairs)
// Returns an object with the matching poker hand
function repeatUntil(phInput){
  let flop = createFlop(true);
  let ph = phInput;
  while (!_.contains(pokerHands, ph)){
    ph = prompt("Please enter a valid poker hand abbreviation (RF, SF, FourK, FH, FL, ST, ThreeK, TwoK or HC): ");
  }
  while(evaluateFlop(flop)[0] !== ph){
    flop = createFlop(true);
  }
  return flop;
}

function runComparison(isRandom){
  let flop1, flop2, hand1, hand2, winner;
  if (!isRandom){
    console.log(`Flop 1 \n${line}`)
    flop1 = createFlop(false);
    console.log(`\nFlop 2 \n${line}`)
    flop2 = createFlop(false);
    hand1 = evaluateFlop(flop1);
    hand2 = evaluateFlop(flop2);
  } else {
    flop1 = createFlop(true);
    flop2 = createFlop(true);
    // flop1 = repeatUntil(FL);
    // flop2 = repeatUntil(SF);
    hand1 = evaluateFlop(flop1);
    hand2 = evaluateFlop(flop2);
  }
  winner = determineWinner(hand1, hand2, flop1, flop2);
  console.log(`Winning result is ${winner[1]} with ${winner[2]}`);  
}

// runComparison(true);
// runComparison(false);
// oddsOfHand(RF);
// oddsOfHand(SF);
// oddsOfHand(FourK);
// oddsOfHand(FH);
// oddsOfHand(FL);
// oddsOfHand(ST);
// oddsOfHand(ThreeK);
// oddsOfHand(TwoK);
// oddsOfHand(HC);


