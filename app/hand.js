const equatorMethods  = require('./equators/index');
const helperMethods   = require('./equators/helpers/index') 

module.exports = class Hand {
  constructor(deck, length) {
    this.pokerHands = [
      'High Card',
      'Pair',
      'Two Pair',
      'Trips',
      'Straight',
      'Flush',
      'Full House',
      'Four Of A Kind',
      'Straight Flush',
      'Royal Flush'
    ]
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

  get highCardNumberValue() {
    return (this.cardNumbers[0] === 1) ? 1 : this.cardNumbers[6]
  }

  get highCardSuiteValue() {
    let highCardNumberValue = this.highCardNumberValue;
    let highCards = this.combo.filter((card) => { return card.number === highCardNumberValue });
    return helperMethods.getHighestCardAmongstDuplicateNumbers(highCards, 1)[0].suite
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

  evaluateHandPossibilities(){
    this.highCardNumber  = this.highCardNumberValue;
    this.highCardSuite   = this.highCardSuiteValue;
    let equatorFunctions = Object.keys(equatorMethods);

    // RF, SF, 4K, FH,FL, ST, 3K, 2P, P, HC
    for (let func of equatorFunctions){
      let response = equatorMethods[func](this.combo, this.cardNumbers, this.cardSuites);
      if (response.pokerHand){
        this.bestFive     = response.pokerHand;
        this.highestHand  = response.highestHand;
        break;
      }
    }

    this.handValue = this.pokerHands.indexOf(this.highestHand);
  }
}