import { faces, suits, Card, Deck } from './cards.js';

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
