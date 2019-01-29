const prompt = require('prompt-sync')();
const _ = require("underscore");

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

// This function allows a user to enter specific cards
function pickCard(){
  let hand = {};
  let cardNumber = Number(prompt("Pick a card number between 1 and 13. 1 for Ace, 13 for King: "));
  while (typeof cardNumber !== "number" || cardNumber < 1 || cardNumber > 13 || isNaN(cardNumber)){
    cardNumber = Number(prompt("Pick a card number between 1 and 13. 1 for Ace, 13 for King: "));
  }
  hand["cardNumber"] = cardNumber;
  let cardSuite = Number(prompt("Pick a card suite. 1 for diamonds, 2 for clubs, 3 for hearts, 4 for spades: "));
  while (typeof cardSuite !== "number" || cardSuite < 1 || cardSuite > 4 || isNaN(cardSuite)){
    cardSuite = Number(prompt("Pick a card suite. 1 for diamonds, 2 for clubs, 3 for hearts, 4 for spades: "));
  }
  hand["cardSuite"] = cardSuite;
  return hand;
}

// This function draws a card at random
function drawCard(){
  let hand = {};
  let suiteNumber = Math.floor(Math.random() * 4) + 1;
  let cardNumber = Math.floor(Math.random() * 13) + 1;
  hand["cardNumber"] = cardNumber;
  hand["cardSuite"] = suiteNumber;
  return hand;
}

// This function checks for duplications in a hand
function checkDuplicates(flop){
  let handArray = [];
  for (let card in flop){
    handArray.push(`${flop[card].cardNumber} ${flop[card].cardSuite}`)
  }
  for (let card in flop){
    if (handArray[`${flop[card].cardNumber} ${flop[card].cardSuite}`]){
      return true;
    } else {
      handArray[flop[card].cardNumber + " " + flop[card].cardSuite] = 1;
    }
  }
  return false;
}

// This function creates a hand filled with five cards (either picked or drawn depending on the value of isRandom)
function createFlop(isRandom){
  let hand = {};
  let cards = ["First", "Second", "Third", "Fourth", "Fifth"];
  for (let order in cards){
    if (isRandom){
      hand[cards[order]] = drawCard();
    } else {
      console.log(cards[order] + " card: ");
      hand[cards[order]] = pickCard();
    }
    while (checkDuplicates(hand)){
      if (isRandom){
        hand[cards[order]] = drawCard();
      } else {
        console.log("Duplicate detected. Redealing the card.")
        console.log(cards[order] + " card: ");
        hand[cards[order]] = pickCard();
      }
    }
  }
  return hand;
}

// returns an object sorted by the number value
function sortByCardNumber(flop){
  let orderedFlop = {}
  Object.keys(flop).sort(function(a, b){
    return flop[a].cardNumber - flop[b].cardNumber;
  }).forEach(function(key){
    orderedFlop[key] = flop[key]
  });
  return orderedFlop;
}

// returns an object sorted by the suite number
function sortBySuiteNumber(flop){
  let orderedFlop = {}
  Object.keys(flop).sort(function(a, b){
    return flop[a].cardSuite - flop[b].cardSuite;
  }).forEach(function(key){
    orderedFlop[key] = flop[key]
  });
  return orderedFlop;
}

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

// returns an array of the cardSuite values
function getSuiteVals(orderedSuiteFlop){
  let suiteValueArray = [];
  Object.keys(orderedSuiteFlop).map(function(card, index){
    suiteValueArray.push(orderedSuiteFlop[card].cardSuite);
  })
  return suiteValueArray;
}

// returns an array of the cardNumber values
function getNumberVals(orderedNumberFlop){
  let numberValueArray = [];
  Object.keys(orderedNumberFlop).map(function(card, index){
    numberValueArray.push(orderedNumberFlop[card].cardNumber);
  })
  return numberValueArray;
}

// returns an integer equal to the highest card number in a hand
function getHighCard(sortedNumbersArray){
  let highCard = null;
  if (sortedNumbersArray[0] == 1){
    highCard = 1;
  } else {
    highCard = sortedNumbersArray[sortedNumbersArray.length - 1];
  }
  return highCard;
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

// Returns [ boolean, highCard, highSuite, null, null ]
function isRoyalFlush(flop){
  let highStraight = false;
  let flush = isFlush(flop)[0];
  let numberSort = sortByCardNumber(flop);
  let numberValues = getNumberVals(numberSort);
  let straight  = [1, 10, 11, 12, 13];
  let highCard, highSuite = null;
  let result = [];
  if (JSON.stringify(numberValues) == JSON.stringify(straight)){
    highStraight = true;
    highCard = 1;
    highSuite = getHighSuiteByCardNumber(flop, highCard);

  }
  if (highStraight && flush){
    result.push(true, highCard, highSuite, null, null);
  } else {
    result.push(false, null, null, null, null);
  }
  return result
}

// Returns [ boolean, highCard, highSuite, null, null ]
function isStraightFlush(flop){
  let straight = isStraight(flop)[0];
  let flush = isFlush(flop)[0];
  let result = [];
  if (straight && flush){
    let highCard = isStraight(flop)[1];
    let highSuite = isFlush(flop)[2];
    result.push(true, highCard, highSuite, null, null);
  } else {
    result.push(false, null, null, null, null)
  }
  return result;
}

// Returns [ boolean, highCard, highSuite, lowCard, lowSuite ]
function isFullHouse(flop){
  let values = occurrencesOfNumber(flop);
  let pairs, trips = false;
  let result = [];
  let highCard, highSuite, lowCard, lowSuite = null;
  Object.keys(values).map(function(key, index){
    if (values[key] === 2){
      pairs = true;
      lowCard = key;
      lowSuite = getHighSuiteByCardNumber(flop, lowCard);
    }
    if (values[key] === 3){
      trips = true;
      highCard = key;
      highSuite = getHighSuiteByCardNumber(flop, highCard);
    }
  })
  if (pairs && trips){
    result.push(true, Number(highCard), Number(highSuite), Number(lowCard), Number(lowSuite));
  } else {
    result.push(false, null, null, null, null);
  }
  return result;
}

// Returns [ boolean, highCard, highSuite, null, null ]
function isFlush(flop){
  let suiteOrdered = sortBySuiteNumber(flop);
  let numberOrdered = sortByCardNumber(flop);
  let suiteValueArray = getSuiteVals(suiteOrdered);
  let numberValueArray = getNumberVals(numberOrdered);
  let firstSuiteValue = suiteValueArray[0];
  let result = [];
  let highCard = numberValueArray.includes(1) ? 1 : numberValueArray[numberValueArray.length - 1];
  let flush = [firstSuiteValue, firstSuiteValue, firstSuiteValue, firstSuiteValue, firstSuiteValue];
  JSON.stringify(suiteValueArray) === JSON.stringify(flush) ?
    result.push(true, Number(highCard), Number(firstSuiteValue), null, null) : result.push(false, null, null, null, null);
  return result;
}

// Returns [ boolean, highCard, highSuite, null, null ]
function isStraight(flop){
  let numberOrdered = sortByCardNumber(flop);
  let numberValueArray = getNumberVals(numberOrdered);
  let jsonNumVal = JSON.stringify(numberValueArray);
  let highCard, highSuite = null;
  let isStraight = false;
  let result = [];
  let firstValue = numberValueArray[0];
  let straight = [firstValue, firstValue + 1, firstValue + 2, firstValue + 3, firstValue + 4];
  let jsonStraight = JSON.stringify(straight);
  let highStraight1   = [1, 10, 11, 12, 13];
  let jsonHigh1   = JSON.stringify(highStraight1);
  let highStraight2	  = [1, 2, 11, 12, 13];
  let jsonHigh2   = JSON.stringify(highStraight2);
  let highStraight3	  = [1, 2, 3, 12, 13];
  let jsonHigh3   = JSON.stringify(highStraight3);
  let highStraight4	  = [1, 2, 3, 4, 13]
  let jsonHigh4   = JSON.stringify(highStraight4);
  if (jsonNumVal === jsonHigh1 || jsonNumVal === jsonHigh2 || jsonNumVal === jsonHigh3 || jsonNumVal === jsonHigh4){
    highCard = 1;
    highSuite = getHighSuiteByCardNumber(flop, highCard);
    isStraight = true;
  } else if (JSON.stringify(numberValueArray) === jsonStraight){
    highCard = firstValue + 4;
    highSuite = getHighSuiteByCardNumber(flop, highCard);
    isStraight = true;
  }
  if (isStraight){
    result.push(true, Number(highCard), Number(highSuite), null, null);
  } else {
    result.push(false, null, null, null, null);
  }
  return result;
}

// Returns [ boolean, highCard, highSuite, null, null ]
function isPair(flop, number){
  let numberValues = occurrencesOfNumber(flop);
  let numberValuesArray = [];
  let result = [];
  let found = false;
  let highCard, highSuite = null;
  Object.keys(numberValues).map(function(occurrences, index){
    if (numberValues[occurrences] === number){
      found = true;
      highCard = occurrences;
      highSuite = getHighSuiteByCardNumber(flop, highCard);
      numberValuesArray.push(occurrences);
    }
  })
  if (numberValuesArray.length > 1){
    numberValuesArray.sort(function(a, b){return a - b});
    highCard = numberValuesArray[numberValuesArray.length - 1];
    highSuite = getHighSuiteByCardNumber(flop, highCard);
  }
  if (found){
    result.push(true, Number(highCard), Number(highSuite), null, null);
  } else {
    result.push(false, null, null, null, null);
  }
  return result;
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

runComparison(true);
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


