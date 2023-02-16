import { color } from './cards.js';

const suits = {
  clubs: '&clubs',
  diamonds: '&diams',
  hearts: '&hearts',
  spades: '&spades',
};

const faces = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export function creeateDeckElement(deck) {
  const element = document.createElement('article');
  element.classList.add('deck');

  for (let i = 0; i < deck.size; i++) {
    const card = deck.cards[i];
    const isTop = i === deck.topIndex;

    element.appendChild(createCard(card, isTop));
  }
}

function createCard(card, isTop) {
  const element = document.createElement('div');
  element.classList.add('card');

  let content = '';

  if (card.faceUp) {
    element.classList.add(color[card.suit]);
    content = `${suits[card.suit]}${faces[card.face]}`;
  } else {
    content = '<span class="back"></span>';
  }

  if (isTop) {
    element.classList.add('top');
  }

  element.textContent = content;

  return element;
}
