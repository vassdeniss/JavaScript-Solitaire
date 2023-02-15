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
