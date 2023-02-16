import { createDeck, shuffleDeck, dealDeck } from './utils.js';
import { createDeckElement } from './dom.js';

const zones = {
  stock: document.getElementById('stock'),
  foundations: document.getElementById('foundation'),
  piles: document.getElementById('pile'),
};

let state = null;
let index = [];

document.getElementById('board').addEventListener('click', onBoardClick);

start();

function start() {
  const deck = createDeck();
  for (let i = 0; i < 10; i++) {
    shuffleDeck(deck);
  }

  [index, state] = dealDeck(deck);

  index.forEach((deck) => (deck.moves = getMoves(deck)));

  console.log(index, state);

  stateToBoard(state);
}

function getMoves(deck, cards) {
  return {
    flip: !cards && deck.canFlip(),
    take:
      !cards &&
      deck.cards
        .map((_, i) => deck.canTake(i))
        .map((v, i) => v && i)
        .filter((v) => v !== false),
    place: cards && deck.canPlace(cards),
  };
}

function stateToBoard(state) {
  zones.stock.replaceChildren(
    createDeckElement(state.stock),
    createDeckElement(state.waste)
  );

  zones.foundations.replaceChildren(
    ...Object.values(state.foundations).map(createDeckElement)
  );

  zones.piles.replaceChildren(...state.piles.map(createDeckElement));

  console.log(state.stock.size);
}

function onBoardClick(event) {
  let deck = null;

  if (event.target.classList.contains('deck')) {
    deck = event.target;
  } else if (event.target.classList.contains('card')) {
    deck = event.target.parentElement;
  } else if (event.target.classList.contains('back')) {
    deck = event.target.parentElement.parentElement;
  }

  if (deck === null) {
    return;
  }

  const type = deck.dataset.type;
  let suit = '';
  let index = -1;

  if (type === 'foundation') {
    suit = deck.dataset.suit;
  }

  if (type === 'pile') {
    index = Number(deck.dataset.index);
  }

  if (type === 'stock') {
    flipStock();
  }

  stateToBoard(state);
}

function flipStock() {
  if (state.stock.size === 0) {
    const cards = [...state.waste.cards];
    state.waste.cards.length = 0;
    cards.reverse();
    state.stock.cards.push(...cards);
  } else {
    for (let i = 0; i < 3; i++) {
      state.stock.flip();
      const card = state.stock.cards.pop();
      state.waste.cards.push(card);
    }
  }
}
