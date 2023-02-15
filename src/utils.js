import {
  faces,
  suits,
  Card,
  Deck,
  Stock,
  Waste,
  Foundation,
  Pile,
} from './cards.js';

export function createDeck() {
  const deck = new Deck();

  for (const suit of Object.values(suits)) {
    for (const face of Object.values(faces)) {
      deck.cards.push(new Card(suit, face));
    }
  }

  return deck;
}

export function shuffleDeck(deck) {
  const stock = [];

  while (deck.size > 0) {
    const card = deck.cards.splice((Math.random() * deck.size) | 0, 1)[0];
    stock.push(card);
  }

  deck.cards.push(...stock);
}

export function dealDeck(deck) {
  const state = {
    stock: new Stock(),
    waste: new Waste(),
    foundations: {
      [suits.Clubs]: new Foundation([], suits.Clubs),
      [suits.Diamonds]: new Foundation([], suits.Diamonds),
      [suits.Hearts]: new Foundation([], suits.Hearts),
      [suits.Spades]: new Foundation([], suits.Spades),
    },
    piles: [
      new Pile(),
      new Pile(),
      new Pile(),
      new Pile(),
      new Pile(),
      new Pile(),
      new Pile(),
    ],
  };

  for (let i = 0; i < 7; i++) {
    debugger;

    const pile = state.piles[i];

    for (let j = 0; j <= i; j++) {
      pile.cards.push(deck.cards.pop());
    }

    pile.top.faceUp = true;
  }

  state.stock.cards.push(...deck.cards);

  return state;
}
