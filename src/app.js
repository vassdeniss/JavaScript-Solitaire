import { createDeck, shuffleDeck, dealDeck } from './utils.js';
import { creeateDeckElement } from './dom.js';

const zones = {
  stock: document.getElementById('stock'),
  foundations: document.getElementById('foundation'),
  piles: document.getElementById('pile'),
};

start();

function start() {
  const deck = createDeck();
  for (let i = 0; i < 10; i++) {
    shuffleDeck(deck);
  }

  const { index, state } = dealDeck(deck);

  console.log(index, state);

  stateToBoard(state);
}

function stateToBoard(state) {
  zones.stock.replaceChildren(
    creeateDeckElement(state.stock),
    creeateDeckElement(state.waste)
  );

  zones.piles.replaceChildren(...state.piles.map(creeateDeckElement));
}
