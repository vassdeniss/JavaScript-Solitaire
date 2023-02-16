import { colors, Stock, Waste } from './cards.js';

const suits = {
  clubs: '&clubs;',
  diamonds: '&diams;',
  hearts: '&hearts;',
  spades: '&spades;',
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

  let cards = deck.cards;

  if (deck.size > 1 && (deck instanceof Stock || deck instanceof Waste)) {
    const visibleCount = Math.ceil((deck.size - 1) / 5);

    cards = new Array(visibleCount).fill({ faceUp: false });

    cards.push(deck.top);
  }

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const isTop = i === cards.length - 1;

    element.appendChild(createCard(card, isTop));
  }

  return element;
}

function createCard(card, isTop) {
  const element = document.createElement('div');
  element.classList.add('card');

  let content = '';

  if (card.faceUp) {
    element.classList.add(colors[card.suit]);
    content = `${suits[card.suit]}${faces[card.face]}`;
  } else {
    content = '<span class="back"></span>';
  }

  if (isTop) {
    element.classList.add('top');
  }

  element.innerHTML = content;

  return element;
}
