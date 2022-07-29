import { RANKS, SUITS } from './constants';
import { Card } from './types';

// generate a deck of suit/rank cards
export const generateDeck = (): Card[] => {
  return SUITS.flatMap((suit) => {
    return RANKS.map((rank) => {
      return { suit, rank };
    });
  });
};

// shuffle a deck of cards
export const shuffleDeck = (deck: Card[]): Card[] => {
  const deckCopy = deck;
  for (let i = deckCopy.length - 1; i > 0; i--) {
    const currentCard = deckCopy[i];
    // get a random index before the current card card index i
    const randomIndex = Math.floor(Math.random() * i);
    [deckCopy[i], deckCopy[randomIndex]] = [deckCopy[randomIndex], currentCard];
  }
  return deckCopy;
};
