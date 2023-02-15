import { faces, suits, Stock, Waste, Foundation, Pile } from './cards.js';

start();

function start() {
  const state = {
    stock: new Stock(),
    waste: new Waste(),
    foundations: {
      [suits.Clubs]: new Foundation([], suits.Clubs),
      [suits.Diamonds]: new Foundation([], suits.Diamonds),
      [suits.Hearts]: new Foundation([], suits.Hearts),
      [suits.Spades]: new Foundation([], suits.Spades),
    },
    piles: new Array(7).fill(new Pile()),
  };
}
