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
    this.deck = [];
    this.hands = [];
  }
  
  deal(numberOfPlayers){
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
    this.cards = new Array(length); // the 2 cards in-hand
    this.river = []; // the 5-card flop
    this.combo = []; // the 7-card combo (cards + river)
    this.deck = deck; // the 52 cards
  }

  get cardNumbers(){
    return this.combo.map((card) => { return card.number }).sort((a, b) => { return a - b });
  }

  get cardSuites() {
    return this.combo.map((card) => { return card.suite }).sort();
  }

  get highCard() {
    return this.cardNumbers[6]
  }

  get highCardSuite() {
    let highCardIndex = this.combo.map((val, i) => { return val.number }).indexOf(this.highCard);
    return this.combo[highCardIndex].suite
  }

  get straightHighCard(){
    if (!this.hasStraight){ return };
    let isAceHighStraight = [1, 10, 11, 12, 13].every((val, i, arr) => { return this.cardNumbers.includes(val) });
    if (isAceHighStraight){ return 1 };

    let straightHighCard;
    for (let i = 0; i < this.cardNumbers.length; i++){
      let straightSequence = JSON.stringify([this.cardNumbers[i], this.cardNumbers[i] + 1, this.cardNumbers[i] + 2, this.cardNumbers[i] + 3, this.cardNumbers[i] + 4])
      let fiveCardSequence = JSON.stringify([this.cardNumbers[i], this.cardNumbers[i+1], this.cardNumbers[i+2], this.cardNumbers[i+3], this.cardNumbers[i+4]]);
      if (straightSequence === fiveCardSequence && this.cardNumbers[i] !== 1){
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

  setRiver(river){ 
    this.river = river;
    this._setCombo(this.river.cards, this.cards);
  }

  _setCombo(riverCards, cards){
    this.combo = riverCards.concat(cards);
  }

  hasRoyalFlush() {
    if (!this.hasStraightFlush()) { return false };
    return (this.straightHighCard === 1);
  }

  hasStraightFlush() {
    if (!(this.hasStraight() && this.hasFlush())){ return false };
    let highCard = this.straightHighCard;
    let flushSuite = this.flushSuite;
    let straightCards = (highCard === 1) ? [1, 10, 11, 12, 13] : [highCard - 4, highCard - 3, highCard - 2, highCard - 1, highCard];
    let comboStraightCards = this.combo.filter((val) => { return (straightCards.includes(val.number) && val.suite == flushSuite) });
    return (comboStraightCards.length === 5)
  }

  hasFourOfAKind() {
    for (let number of this.cardNumbers){
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      if (occurrences === 4){
        return true;
      }
    }
    return false;
  }

  hasFullHouse() {
    if (!this.hasTrips()) { return false };
    let pair = [], trips = [];
    for (let number of this.cardNumbers){
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      // Possibilities: [trips, trips], [trips, pair], [quads, trips], [quads, pair]
      if (occurrences >= 3 && !trips.includes(number)){
        trips.push(number);
      }
      if (occurrences === 2 && !pair.includes(number)){
        pair.push(number);
      }
      let isFullHouse = ((trips.length === 2) || (trips.length === 1 && pair.length >= 1)) 
      if (isFullHouse){ return true };
    }
    return false;
  }

  hasFlush() {
    for (let suite of this.cardSuites){
      let occurrences = this.cardSuites.filter((val, i, arr) => { return arr[i] === suite }).length;
      if (occurrences >= 5){
        return true;
      }
    }
    return false;
  }

  hasStraight() {
    let isAceHighStraight = [1, 10, 11, 12, 13].every((val, i, arr) => { return this.cardNumbers.includes(val) });
    if (isAceHighStraight){ return true };
    for (let n of this.cardNumbers){
      if (isNaN(this.cardNumbers[n+5])){ return false };
      let straightSequence = JSON.stringify([this.cardNumbers[n], this.cardNumbers[n] + 1, this.cardNumbers[n] + 2, this.cardNumbers[n] + 3, this.cardNumbers[n] + 4])
      let fiveCardSequence = JSON.stringify([this.cardNumbers[n], this.cardNumbers[n+1], this.cardNumbers[n+2], this.cardNumbers[n+3], this.cardNumbers[n+4]]);
      if (straightSequence === fiveCardSequence && this.cardNumbers[n] !== 1){ return true };
    }
  }

  hasTrips() {
    for (let number of this.cardNumbers){
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      if (occurrences >= 3){
        return true;
      }
    }
    return false;
  }

  hasTwoPair() {
    let pairs = [];
    for (let number of this.cardNumbers) {
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number)
      }
    }
    return (pairs.length >= 2);
  }

  hasPair() {
    let pairs = [];
    for (let number of this.cardNumbers) {
      let occurrences = this.cardNumbers.filter((val, i, arr) => { return arr[i] === number }).length;
      if (occurrences === 2 && !pairs.includes(number)){
        pairs.push(number)
      }
    }
    return (pairs.length >= 1);
  }
}

let game = new Game();
game.deal(1);
let x = 0;
while (!game.hands[0].hasRoyalFlush()){
  x++;
  game = new Game()
  game.deal(1);
}
console.log(game.hands[0].combo);
console.log(x);