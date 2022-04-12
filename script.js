import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop;

document.addEventListener("click", () => {
  //if inRound = true, start cleanBeforeRound, else, flipCards.
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2); //math.ceil rounds a number up to the next largest integer (when the deck is an odd number)

  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint)); //slice the deck from 0 to midpoint, then create a new deck from these cards.
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards)); //same thing, but start at midpoint, and end at "52" (deck.numberOfCards = 52)
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

// computerCardSlot.appendChild(deck.cards[0].getHTML()) //have computer-card-slot attach the first random card from its deck to the variable

function cleanBeforeRound() {
  //
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop(); //removes the last element of the array and returns that element. This changes the length of the array.
  const computerCard = computerDeck.pop(); //do the same with comp

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  updateDeckCount(); //update the deck count after clicking

  if (isRoundWinner(playerCard, computerCard)) {
    //Card win condition and result; cards go into players deck
    text.innerText = "Win - Player Gained a Card!";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    //Card lose condition; cards go into computers deck
    text.innerText = "Lose - Player Lost a Card!";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    //Card draw condition; cards go back into respective decks
    text.innerText = "Draw - Nothing Happens!";
    playerDeck.push(playerCard);
    computerDeck.push(computerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You LOSE!";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You WIN!";
    stop = true;
  }
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}
