import { createDeck, shuffleDeck, dealDeck } from './utils.js';
import { createDeckElement } from './dom.js';

const zones = {
  stock: document.getElementById('stock'),
  foundations: document.getElementById('foundation'),
  piles: document.getElementById('pile'),
};

let state = null;
let index = [];
let currentMove = null;

document.getElementById('new-game').addEventListener('click', start);
document.getElementById('board').addEventListener('click', onBoardClick);

start();

function start() {
  currentMove = null;

  const deck = createDeck();
  for (let i = 0; i < 10; i++) {
    shuffleDeck(deck);
  }

  [index, state] = dealDeck(deck);

  index.forEach((deck) => (deck.moves = getMoves(deck)));

  stateToBoard(state);
}

function getMoves(deck, cards, index) {
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

  if (Object.values(state.foundations).every((f) => f.size === 13)) {
    setTimeout(() => alert('You Win!'), 0);
  }
}

function onBoardClick(event) {
  let deck = null;
  let card = null;

  if (event.target.classList.contains('deck')) {
    deck = event.target;
  } else if (event.target.classList.contains('card')) {
    card = event.target;
    deck = card.parentElement;
  } else if (event.target.classList.contains('back')) {
    deck = event.target.parentElement.parentElement;
  }

  if (deck === null) {
    return;
  }

  const type = deck.dataset.type;

  let suit = '';
  if (type === 'foundations') {
    suit = deck.dataset.suit;
  }

  let pileIndex = -1;
  if (type === 'piles') {
    pileIndex = Number(deck.dataset.index);
  }

  let cardIndex = -1;
  if (card !== null) {
    cardIndex = Number(card.dataset.index);
  }

  const action = deck.dataset.action;
  let cards = undefined;
  switch (action) {
    case 'flip':
      if (type === 'stock') {
        flipStock();
      } else if (type === 'piles') {
        flipPile(pileIndex);
      }
      currentMove = null;
      break;
    case 'take':
      const deck = findDeck(type, pileIndex, suit);

      cards = deck.cards.slice(cardIndex);

      currentMove = {
        source: deck,
        type,
        pileIndex,
        cardIndex,
      };

      document.body.style.cursor = 'grabbing';

      break;
    case 'place':
      const target = findDeck(type, pileIndex, suit);
      const selectedCards = currentMove.source.take(currentMove.cardIndex);
      target.place(selectedCards);

      currentMove = null;
      break;
  }

  index.forEach((deck) => (deck.moves = getMoves(deck, cards)));
  stateToBoard(state);
}

function findDeck(type, index, suit) {
  let deck = null;

  if (type == 'piles') {
    deck = state[type][index];
  } else if (type == 'foundations') {
    deck = state[type][suit];
  } else {
    deck = state[type];
  }

  return deck;
}

function flipStock() {
  if (state.stock.size === 0) {
    const cards = [...state.waste.cards];
    state.waste.cards.length = 0;
    cards.reverse();
    cards.forEach((card) => (card.faceUp = false));
    state.stock.cards.push(...cards);
  } else {
    //for (let i = 0; i < 3; i++) {
    state.stock.flip();
    const card = state.stock.cards.pop();
    state.waste.cards.push(card);
    //}
  }
}

function flipPile(index) {
  state.piles[index].flip();
}
