class Card {
  constructor(suit, face, faceUp = false) {
    this.suit = suit;
    this.face = face;
    this.faceUp = faceUp;
  }
}

class Deck {
  constructor(cards = []) {
    this.cards = cards;
  }

  canFlip() {
    throw new TypeError('Cannot invoke abstract method');
  }

  canTake(index) {
    throw new TypeError('Cannot invoke abstract method!');
  }

  canPlace(cards) {
    throw new TypeError('Cannot invoke abstract method!');
  }

  flip() {
    throw new TypeError('Cannot invoke abstract method!');
  }

  take() {
    throw new TypeError('Cannot invoke abstract method!');
  }

  place() {
    throw new TypeError('Cannot invoke abstract method!');
  }
}
