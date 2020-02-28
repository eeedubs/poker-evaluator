const prompt = require('prompt-sync')();
const fs = require('fs');
const cards = fs.readFileSync('./cards.txt', 'utf8')

class Game {
  constructor() {
    this.deck = [];
    this.hands = [];
  }
  
  play(numberOfPlayers){
    this._deal(numberOfPlayers);
    this.hands.forEach((hand) => {
      hand.evaluateHandPossibilities();
    });
    this.determineWinner();
  }

  _deal(numberOfPlayers){
    this.deck = new Deck(cards);
    this._dealCards(numberOfPlayers);
    this._dealRiver();
  }

  _dealCards(numberOfPlayers){
    // Create a hand for each player in the game.
    for (let x = 0; x < numberOfPlayers; x++){
      this.hands.push(new Hand(this.deck, 2));
    }

    // Deal a card to each player, in sequence, twice.
    for (let round = 0; round < 2; round++){
      for (let turn = 0; turn < numberOfPlayers; turn++){
        let newCard = new Card;
        newCard.drawRandom(this.deck);
        this.hands[turn].cards[round] = newCard;
      }
    }
  }

  _dealRiver(){
    // Deal the river and burn cards
    this.river = new River(this.deck);
    for (let hand of this.hands){
      hand.setRiver(this.river);
      hand.removeDeck();
    }
  }

  determineWinner(){
    let winners = [];
    for (let hand of this.hands){
      // console.log(hand);
    }
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
      newCard.setValues(number, suite);
      deck.push(newCard);
    }
    return deck;
  }
}

class River {
  constructor(deck) {
    [this.cards, this.burnPile] = this._dealDeck(deck);
  }

  _dealDeck(deck) {
    let cards = [];
    let burnPile = [];
    for (let i = 0; i < 8; i++){
      let newCard = new Card();
      newCard.drawRandom(deck);
      if ([0, 4, 6].includes(i)){
        burnPile.push(newCard);
      } else {
        cards.push(newCard);
      }
    }
    return [cards, burnPile];
  }
}

class Card {
  constructor() {
    this.number = null;
    this.suite = null;
  }

  setValues(number, suite) {
    this.number = number;
    this.suite = suite;
  }
  
  drawRandom(deck) {
    let cardIndex = Math.floor(Math.random() * deck.cards.length);
    let card = deck.cards.splice(cardIndex, 1)[0];
    this.number = card.number;
    this.suite = card.suite;
  }
}

class Hand {
  constructor(deck, length) {
    this.suiteValue = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
    this.cards = new Array(length); // the 2 cards in-hand
    this.river = []; // the 5-card flop
    this.combo = []; // the 7-card combo (cards + river)
    this.deck = deck; // the 52 cards
    this.bestFive = [];
  }

  get cardNumbers(){
    return this.combo.map((card) => { return card.number }).sort((a, b) => { return a - b });
  }

  get cardSuites() {
    return this.combo.map((card) => { return card.suite }).sort();
  }

  get highCard() {
    return (this.cardNumbers[0] === 1) ? 1 : this.cardNumbers[6]
  }

  get straightHighCard(){
    if (!this.hasStraight){ return };
    let isAceHighStraight = [1, 10, 11, 12, 13].every(val => this.cardNumbers.includes(val));
    if (isAceHighStraight){ return 1 };
    let straightHighCard;
    for (let i = 0; i < this.cardNumbers.length; i++){
      let startCard = this.cardNumbers[i];
      let straightSequence = [startCard, startCard + 1, startCard + 2, startCard + 3, startCard + 4]
      let isAStraight = (straightSequence.every((val) => { return this.cardNumbers.includes(val) }) && startCard !== 1)
      if (isAStraight){
        straightHighCard = this.cardNumbers[i+4];
      }
    }
    return straightHighCard;
  }

  get flushSuite(){
    if (!this.hasFlush){ return }
    for (let suite of this.cardSuites){
      let occurrences = this.cardSuites.filter((val, i, arr) => { return arr[i] === suite }).length;
      if (occurrences >= 5){
        return suite
      }
    }
  }

  get handValue(){
    let value = 0;
    switch(true) {
      case (this.isRoyalFlush):
        value = 10;
        break;
      case (this.isStraightFlush):
        value = 9;
        break;
      case (this.isFourOfAKind):
        value = 8;
        break;
      case (this.isFullHouse):
        value = 7;
        break;
      case (this.isFlush):
        value = 6;
        break;
      case (this.isStraight):
        value = 5;
        break;
      case (this.isTrips):
        value = 4;
        break;
      case (this.isTwoPair):
        value = 3;
        break;
      case (this.isTwoPair):
        value = 2;
        break;
      case (this.isPair):
        value = 1;
        break;
      default:
        value = 0;
    }
    return value;
  }

  setRiver(river){ 
    this.river = river;
    this._setCombo(this.river.cards, this.cards);
  }

  _setCombo(riverCards, cards){
    this.combo = riverCards.concat(cards);
  }

  removeDeck(){
    this.deck = [];
  }

  assignBestFive(cards){
    if (cards.length === 5){
      this.bestFive = cards;
    }
  }

  evaluateHandPossibilities(){
    this.highCardValue = this.highCard;
    this.isPair = this.hasPair();
    this.isTwoPair = this.hasTwoPair();
    this.isTrips = this.hasTrips();
    this.isStraight = this.hasStraight();
    this.isFlush = this.hasFlush();
    this.isFullHouse = this.hasFullHouse();
    this.isFourOfAKind = this.hasFourOfAKind();
    this.isStraightFlush = this.hasStraightFlush();
    this.isRoyalFlush = this.hasRoyalFlush();
    this.value = this.handValue;
  }

  // NOTE:
  // if (a.number !== 1 && b.number === 1){
  //   return 1;
  // } else if (a.number === 1 && b.number !== 1){
  //   return -1;
  // } else if (a.number < b.number){
  //   return 1;
  // } else if (a.number > b.number){
  //   return -1;
  // }  ... ALL WORKS
  // 
  // BUT
  // if ((a.number < b.number) || (a.number !== 1 && b.number === 1)){
  //   return 1;
  // } else if ((a.number > b.number) || (a.number === 1 && b.number !== 1)){
  //   return -1;
  // }  ... DOESN'T WORK

  getHighestCardsOutsideRemainingSet(cardsToIgnore, numberToKeep){
    let remainingCards = this.combo.filter((card) => { return !cardsToIgnore.includes(card) });
    let sortedByValue = remainingCards.sort((a, b) => {
      if (a.number !== 1 && b.number === 1){
        return 1;
      } else if (a.number === 1 && b.number !== 1){
        return -1;
      } else if (a.number < b.number){
        return 1;
      } else if (a.number > b.number){
        return -1;
      } else {
        if (this.suiteValue.indexOf(a.suite) < this.suiteValue.indexOf(b.suite)){
          return 1;
        } else {
          return -1;
        }
      }
    });
    return sortedByValue.slice(0, numberToKeep);
  }

  pickFiveHighestCardsFromStraight(straightCandidates){
    let straightCards = []
    for (let x = 0; x < straightCandidates.length; x++){
      let straightCardEntries = straightCards.map((card) => { return card.number })
      let cardNumberValue = straightCandidates[x].number
      // Pool together possible duplicates for each card number
      let possibleDuplicates = straightCandidates.filter(card => card.number === cardNumberValue)
      if (possibleDuplicates.length >= 2){
        // pick the highest card amongst the numbers
        let highestCard = this.pickHighestCardsAmongstDuplicateNumbers(possibleDuplicates, 1);
        if (!straightCardEntries.includes(highestCard.number)){
          straightCards.concat(highestCard);
        }
      } else {
        straightCards.push(straightCandidates[x])
      }
    }
    return straightCards
  }

  pickHighestCardsAmongstDuplicateNumbers(duplicateCards, numberToKeep){
    return duplicateCards.sort((a, b) => {
      if (this.suiteValue.indexOf(a.suite) < this.suiteValue.indexOf(b.suite)){
        return 1;
      } else {
        return -1;
      }
    }).slice(0, numberToKeep);
  }

  hasRoyalFlush() {
    if (!this.hasStraightFlush()) { return false };
    let pokerHand = [];
    if (this.straightHighCard === 1){
      let flushSuite = this.flushSuite;
      pokerHand = this.combo.filter((card) => { return ([1, 10, 11, 12, 13].includes(card.number) && card.suite == flushSuite) });
      this.assignBestFive(pokerHand);
      return true;
    }
    return false;
  }

  hasStraightFlush() {
    if (!(this.isStraight && this.isFlush)){ return false };
    let pokerHand = [];
    let highCard = this.straightHighCard;
    let flushSuite = this.flushSuite;
    let straightCardsToMatch = (highCard === 1) ? [1, 10, 11, 12, 13] : [highCard - 4, highCard - 3, highCard - 2, highCard - 1, highCard];
    let straightFlushCards = this.combo.filter((val) => { return (straightCardsToMatch.includes(val.number) && val.suite == flushSuite) });
    let isStraightFlush = (straightFlushCards.length === 5)
    if (isStraightFlush){
      pokerHand = straightFlushCards;
      this.assignBestFive(pokerHand);
      return true;
    }
    return false;
  }
  
  hasFourOfAKind() {
    let pokerHand = [];
    for (let cardNumber of this.cardNumbers){
      let occurrences = this.cardNumbers.filter((val) => { return val === cardNumber }).length;
      if (occurrences === 4){
        let fourOfAKindCards = this.combo.filter((val) => { return (val.number === cardNumber) })
        let nextHighestCard = this.getHighestCardsOutsideRemainingSet(fourOfAKindCards, 1);
        pokerHand = fourOfAKindCards.concat(nextHighestCard);
        this.assignBestFive(pokerHand);
        return true;
      }
    }
    return false;
  }

  hasFullHouse() {
    if (!this.hasTrips()) { return false };
    let pokerHand = [];
    let pairs = [], trips = [];
    let fullHouseCards = [];
    for (let number of this.cardNumbers){
      let occurrences = this.cardNumbers.filter(val => val === number).length;
      
      // divert to hasFourOfAKind()
      if (occurrences === 4){
        return true;
      }

      // Possibilities: [trips, trips], [trips, pair], [quads, trips], [quads, pair]
      if (occurrences === 3 && !trips.includes(number) && !pairs.includes(number)){
        trips.push(number);
      }
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number);
      }

      let isFullHouse = ((trips.length === 2) || (trips.length === 1 && pairs.length >= 1)) 
      if (isFullHouse){
        //  2 trips
        if (trips.length === 2){
          let higherTripNumberValue = ((trips[0] > trips[1] && trips[1] !== 1) || trips[0] === 1) ? trips[0] : trips[1];
          let lowerTripNumberValue = trips.filter((val) => { return val !== higherTripNumberValue });
          let higherTripCards = this.combo.filter((card) => { return card.number === higherTripNumberValue });
          let lowerTripCards = this.combo.filter((card) => { return card.number === lowerTripNumberValue });
          let bestTwoOfLowerTripCards = lowerTripCards.sort((a, b) => {
            if (this.suiteValue.indexOf(a.suite) < this.suiteValue.indexOf(b.suite)){
              return 1;
            } else {
              return -1;
            }
          }).slice(0, 2);
          fullHouseCards = higherTripCards.concat(bestTwoOfLowerTripCards);
          break;
        } 
        else {
        //  1 trips with 2 pairs 
          if (pairs.length === 2){
            let higherPairNumberValue = ((pairs[0] > pairs[1] && pairs[1] !== 1) || pairs[0] === 1) ? pairs[0] : pairs[1];
            let fullHouseValues = [trips[0], higherPairNumberValue]
            fullHouseCards = this.combo.filter((card) => { return fullHouseValues.includes(card.number) })
            break;
          }
            // 1 trips with 1 pair 
          else {
            let fullHouseValues = [trips[0], pairs[0]];
            fullHouseCards = this.combo.filter((card) => { return fullHouseValues.includes(card.number) });
          }
        }
      };
    }

    if (fullHouseCards.length === 5){
      pokerHand = fullHouseCards
      this.assignBestFive(pokerHand);
      return true;
    }
    return false;
  }

  hasFlush() {
    let pokerHand = [];
    for (let suite of this.cardSuites){
      let occurrences = this.cardSuites.filter((val, i, arr) => { return arr[i] === suite }).length;
      if (occurrences >= 5){
        let allFlushCards = this.combo.filter((card) => { return card.suite === suite });
        //  take the best five cards from the suite
        pokerHand = allFlushCards.sort((a, b) => { 
          if ((a.number < b.number && a.number !== 1) || (b.number === 1)){
            return 1;
          } else {
            return -1;
          }
        }).slice(0, 5);
        this.assignBestFive(pokerHand);
        this.isFlush = true;
        return true;
      }
    }
    return false;
  }

  hasStraight() {
    let pokerHand = [];
    let allPossibleStraightCards = [];
    // ace high straight
    let isAceHighStraight = [1, 10, 11, 12, 13].every(val => this.cardNumbers.includes(val));
    if (isAceHighStraight){
      allPossibleStraightCards = this.combo.filter((card) => { return [1, 10, 11, 12, 13].includes(card.number) });
      pokerHand = this.pickFiveHighestCardsFromStraight(allPossibleStraightCards);
      this.assignBestFive(pokerHand);
      this.isStraight = true;
      return true;
    };

    // normal straight
    for (let startCard of this.cardNumbers){
      if (startCard + 4 > 13){ return false }
      let straightSequence = [startCard, startCard + 1, startCard + 2, startCard + 3, startCard + 4]
      // It is a straight if: 
      //  - every number in the straight sequence is in the combo, and 
      //  - if the starting card is not an ace
      let isAStraight = (straightSequence.every(val => this.cardNumbers.includes(val)) && startCard !== 1)
      if (isAStraight){
        // Get all qualifying numbers that match the straight sequence
        allPossibleStraightCards = this.combo.filter((val) => { return straightSequence.includes(val.number) })
      }
    }

    if (allPossibleStraightCards.length >= 5){
      pokerHand = this.pickFiveHighestCardsFromStraight(allPossibleStraightCards);
      console.log(pokerHand);
      this.assignBestFive(pokerHand);
      this.isStraight = true;
      return true;
    }

    return false;
  }

  hasTrips() {
    let pokerHand = [];
    let pairs = [], trips = [];
    for (let number of this.cardNumbers){
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      // Four of a kind, divert to hasFourOfAKind() logic
      if (occurrences === 4){
        return true;
      }
      if (occurrences === 3 && !trips.includes(number) && !pairs.includes(number)){
        trips.push(number)
        // full house, divert to hasFullHouse() logic
        if (trips.length === 2){ 
          return true 
        } 
      }
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number);
        // full house, divert to hasFullHouse() logic
        if (trips.length >= 1 && pairs.length >= 1){
          return true
        }
      }
    }
    
    if (trips.length === 1 && pairs.length === 0){  
      let tripCards = this.combo.filter(card => card.number === trips[0])
      let remainingCards = this.getHighestCardsOutsideRemainingSet(tripCards, 2);
      pokerHand = tripCards.concat(remainingCards);
      this.assignBestFive(pokerHand);
      return true;
    }
    return false;
  }

  hasTwoPair() {
    let pokerHand = [];
    let pairs = [];
    for (let number of this.cardNumbers) {
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      
      //  trips or four of a kind
      if ([3, 4].includes(occurrences)){ 
        return true;
      }
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number)
      }
    }
    if (pairs.length >= 2){
      if (pairs.length === 3){
        let twoHighestPairValues = pairs.sort((a, b) => { 
          if (a < b && a !== 1){
            return 1;
          } else {
            return -1;
          }
        }).slice(0, 2);
        let pairCards = this.combo.filter(val => twoHighestPairValues.includes(val.number))
        let nextHighestCard = this.getHighestCardsOutsideRemainingSet(pairCards, 1);
        pokerHand = pairCards.concat(nextHighestCard);
      } else {
        let pairCards = this.combo.filter(val => [pairs[0], pairs[1]].includes(val.number))
        let nextHighestCard = this.getHighestCardsOutsideRemainingSet(pairCards, 1);
        pokerHand = pairCards.concat(nextHighestCard);
      }
      this.assignBestFive(pokerHand);
      return true;
    }
    return false;
  }

  hasPair() {
    let pokerHand = [];
    let pairs = [];
    for (let number of this.cardNumbers) {
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;

      // divert to hasTrips() or hasFourOfAKind()
      if ([3, 4].includes(occurrences)){ 
        return true;
      }

      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number)

        //  divert to hasTwoPair()
        if (pairs.length >= 2){
          return true;
        }
      }
    }
    if (pairs.length === 1){
      let pairCards = this.combo.filter(val => val.number === pairs[0])
      let remainingCards = this.getHighestCardsOutsideRemainingSet(pairCards, 3);
      pokerHand = pairCards.concat(remainingCards);
      this.assignBestFive(pokerHand);
      return true;
    }
    return false;
  }
}

let game = new Game();
game.play(1);
while (!game.hands[0].isStraight){
  game = new Game();
  game.play(1);
}
console.log(game.hands[0]);