# POKER HAND EVALUATOR
----------------------
Poker Hand Evaluator is a program built in JavaScript which determines the highest ranking poker hand of two regular 5-card poker hands, which are either generated randomly or entered manually by the user.

The program prevents a variety of user-driven errors, such as the possibility of inputting duplicate cards within the same deck, or declaring a card number or suite that does not exist (e.g. 15 of Elephants). 

Additionally, the oddsOfHand(input) function can calculate how many randomly-generated poker hands it would take in order to achieve a specific hand. 

### Dependencies

* Node.js
* underscore (JavaScript library)
* prompt-sync (JavaScript library)

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Comment in/out the tests which you wish to run at the bottom of Poker.js. 
  - To evaluate the strength of specific poker hands (generated at random) relative to each other, modify the flop1 and flop2 declarations within the else statement of the runComparison(isRandom) function.
4. Run the program using the `node poker.js` command.