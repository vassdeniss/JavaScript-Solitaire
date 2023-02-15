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
    return this.cards[this.topIndex];
  }

  get topIndex() {
    return this.size - 1;
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

class Stock extends Deck {
  canTake(index) {
    return false;
  }

  canPlace(cards) {
    return false;
  }

  take(index) {
    throw new Error('Cannot take from stock!');
  }

  place(cards) {
    throw new Error('Cannot place on stock!');
  }
}

class Waste extends Deck {
  canTake(index) {
    return this.size > 0 && index === this.topIndex;
  }

  canPlace(cards) {
    return false;
  }

  take(index) {
    if (!this.canTake) {
      throw new Error('Cannot take card!');
    }

    return this.cards.splice(index, this.size - index);
  }

  place(cards) {
    throw new Error('Cannot place on waste!');
  }
}
