const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = freshDeck()) {
    //when called upon, makes the fresh deck
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  pop() {
    //creating the pop function within Deck class
    return this.cards.shift(); //shift, takes the first element of our array, takes it off and returns it to us
  }

  push(card) {
    //adds a card to the bottom of the deck
    this.cards.push(card); //push add 1 or more elements to the end of an array and returns the new length
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1)); //math.random outputs a number between 0-1; math.floor returns the largest integer(whole number) than than or equal to a given number
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  //creates a class for Card; to combine with suit and value
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
  }

  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value} ${this.suit}`; //.dataset accesses the data-value in the card
    return cardDiv;
  }
}

//getHTML will essentially output the following
// <div class="card red" data-value="9 ♥">
// ♥
// </div>

function freshDeck() {
  //creates an array which combines SUITS and VALUES into an array that has 1 suit, for each value.
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
