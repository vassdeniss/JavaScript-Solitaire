export const faces = {
  Ace: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13,
};

export const suits = {
  Clubs: 'clubs',
  Diamonds: 'diamonds',
  Hearts: 'hearts',
  Spades: 'spades',
};

export const colors = {
  clubs: 'black',
  diamonds: 'red',
  hearts: 'red',
  spades: 'black',
};

export class Card {
  constructor(suit, face, faceUp = false) {
    this.suit = suit;
    this.face = face;
    this.faceUp = faceUp;
  }
}

export class Deck {
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

  take(index) {
    if (!this.canTake(index)) {
      throw new Error('Cannot take card!');
    }

    return this.cards.splice(index, this.size - index);
  }

  place(cards) {
    if (!this.canPlace(cards)) {
      throw new Error('Cannot take card!');
    }

    if (!Array.isArray(cards)) {
      cards = [cards];
    }

    this.cards.push(...cards);
  }
}

export class Stock extends Deck {
  canFlip() {
    return true;
  }

  canTake(index) {
    return false;
  }

  canPlace(cards) {
    return false;
  }
}

export class Waste extends Deck {
  canTake(index) {
    return this.size > 0 && index === this.topIndex;
  }

  canPlace(cards) {
    return false;
  }
}

export class Foundation extends Deck {
  constructor(cards, suit) {
    super(cards);

    this.suit = suit;
  }

  canTake(index) {
    return this.size > 0 && index === this.topIndex;
  }

  canPlace(cards) {
    if (!cards || (Array.isArray(cards) && cards.length > 1)) {
      return false;
    }

    const card = Array.isArray(cards) ? cards[0] : cards;

    const isSameSuit = card.suit === this.suit;
    const isFirstCard = card.face === faces.Ace && this.size === 0;
    const isFollowUpCard = this.size > 0 && card.face - 1 === this.top.face;

    return isSameSuit && (isFirstCard || isFollowUpCard);
  }
}

export class Pile extends Deck {
  canTake(index) {
    return this.size > 0 && this.cards[index].faceUp;
  }

  canPlace(cards) {
    if (!cards) {
      return false;
    }

    if (!Array.isArray(cards)) {
      cards = [cards];
    }

    const bottomCard = cards[0];

    const isPileEmpty = bottomCard.face === faces.King && this.size === 0;
    if (isPileEmpty) {
      return true;
    }

    const hasCards = this.size > 0;
    const isLowerFace = bottomCard.face + 1 === this.top.face;
    const isOppositeSuit = colors[bottomCard.suit] !== colors[this.top.suit];

    return isPileEmpty || (hasCards && isLowerFace && isOppositeSuit);
  }
}
