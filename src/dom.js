import { colors, Foundation, Pile } from './cards.js';

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

export function createDeckElement(deck, index) {
  const element = document.createElement('article');
  element.classList.add('deck');

  let activeCard = false;
  if (deck.moves.flip || deck.moves.place || deck.moves.take.length > 0) {
    if (!deck.moves.place) {
      document.body.style.cursor = 'default';
    }

    if (deck.size === 0 || deck.moves.place) {
      element.classList.add('active');
    }

    if (deck.moves.place) {
      element.dataset.action = 'place';
      activeCard = true;
    } else if (deck.moves.flip) {
      element.dataset.action = 'flip';
      activeCard = true;
    } else if (deck.moves.take.length > 0) {
      element.dataset.action = 'take';
      activeCard = true;
    }
  }

  element.dataset.type = deck.constructor.name.toLowerCase();

  if (deck instanceof Foundation) {
    element.dataset.type = 'foundations';
    element.dataset.suit = deck.suit;
  }

  if (deck instanceof Pile) {
    element.dataset.type = 'piles';
    element.dataset.index = index;
  }

  let cards = deck.cards;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const isTop = i === cards.length - 1;

    const isStockCard = isTop && deck.canFlip();
    const isPileCard = deck.canTake(i);

    const isActive = activeCard && (isStockCard || isPileCard);

    element.appendChild(createCard(card, isTop, i, isActive));
  }

  return element;
}

function createCard(card, isTop, index, isActive) {
  const element = document.createElement('div');
  element.classList.add('card');
  element.dataset.index = index;

  if (isActive) {
    element.classList.add('active');
  }

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
