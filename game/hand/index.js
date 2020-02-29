const methods = require('./equators/index');

module.exports = class Hand {
  constructor(deck, length) {
    this.suiteValue = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
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

  get highCard() {
    return (this.cardNumbers[0] === 1) ? 1 : this.cardNumbers[6]
  }

  get straightHighCard(){
    if (!this.equateStraight){ return };
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
    if (!this.equateFlush){ return }
    for (let suite of this.cardSuites){
      let occurrences = this.cardSuites.filter((val, i, arr) => { return arr[i] === suite }).length;
      if (occurrences >= 5){
        return suite
      }
    }
  }

  get getHandValue(){
    return this.pokerHands.indexOf(this.highestHand);
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
    this.isHighCard = methods.equateHighCard(this);
    this.isPair = methods.equatePair(this);
    this.isTwoPair = methods.equateTwoPair(this);
    this.isTrips = methods.equateTrips(this);
    this.isStraight = methods.equateStraight(this);
    this.isFlush = methods.equateFlush(this);
    this.isFullHouse = methods.equateFullHouse(this);
    this.isFourOfAKind = methods.equateFourOfAKind(this);
    this.isStraightFlush = methods.equateStraightFlush(this);
    this.isRoyalFlush = methods.equateRoyalFlush(this);
    this.handValue = this.getHandValue;
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
}