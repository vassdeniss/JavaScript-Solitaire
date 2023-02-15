import { createDeck, shuffleDeck, dealDeck } from './utils.js';

start();

function start() {
  const deck = createDeck();
  for (let i = 0; i < 10; i++) {
    shuffleDeck(deck);
  }

  const state = dealDeck(deck);

  console.log(state);
}
