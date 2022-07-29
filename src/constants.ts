import type { Rank, Suit } from './types';

// array of all the suits in the game
export const SUITS: Suit[] = ['♠', '♣', '♥', '♦'];
// array of all the ranks in the game
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
// To customize the number of cards to deal
export const HAND_SIZE = 5;
// the duration of the audio file (drawCardSound.mp3) in milliseconds
export const DRAW_CARD_SOUND_DURATION = 170;
