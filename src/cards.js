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

  get top() {
    return this.cards[this.size - 1];
  }

  get size() {
    return this.cards.length;
  }

  canFlip() {
    return this.size > 0 && !this.top.faceUp;
  }

  canTake(index) {
    throw new TypeError('Cannot invoke abstract method!');
  }

  canPlace(cards) {
    throw new TypeError('Cannot invoke abstract method!');
  }

  flip() {
    if (!this.canFlip()) {
      throw new Error('Cannot flip card!');
    }

    this.top.faceUp = true;
  }

  take() {
    throw new TypeError('Cannot invoke abstract method!');
  }

  place() {
    throw new TypeError('Cannot invoke abstract method!');
  }
}
