import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { DrawCardSound, WinParticles, WinnerBanner } from './assets';
import ContainedButton from './components/ContainedButton';
import DataDisplay from './components/DataDisplay';
import Hand from './components/Hand';
import TransparentButton from './components/TransparentButton';
import { DRAW_CARD_SOUND_DURATION, HAND_SIZE } from './constants';
import { Card } from './types';
import { generateDeck, shuffleDeck } from './utils';
import styles from './App.module.css';

const SHUFFLED_DECK = shuffleDeck(generateDeck());
const INITIAL_DECK = SHUFFLED_DECK.slice(HAND_SIZE, SHUFFLED_DECK.length);
const INITIAL_HAND = INITIAL_DECK.slice(0, HAND_SIZE);

// play the card draw sound n times (number of cards drawn)
const playCardsDrawSound = (n: number) => {
  const drawCardSound = new Audio(DrawCardSound);
  drawCardSound.loop = true;
  drawCardSound.play();
  setTimeout(() => {
    drawCardSound.pause();
    drawCardSound.currentTime = 0;
  }, DRAW_CARD_SOUND_DURATION * n);
};

function App() {
  const [deck, setDeck] = useState<Card[]>(INITIAL_DECK);
  const [hand, setHand] = useState<Card[]>(INITIAL_HAND);
  const [isWinner, setWinner] = useState<boolean>(false);
  const [isLoser, setLoser] = useState<boolean>(false);
  const [handIndex, setHandIndex] = useState<number>(0);

  const deckLength = deck.length;
  const acesLeft = deck.filter((card) => card.rank === 'A').length;

  const deal = (): void => {
    if (deckLength === 0) {
      return;
    }
    const newHand = deck.slice(0, HAND_SIZE);
    const newDeck = deck.slice(HAND_SIZE, deckLength);
    setHand(newHand);
    setDeck(newDeck);
    setHandIndex(handIndex + 1);
    playCardsDrawSound(newHand.length);
  };

  const playAgain = (): void => {
    setDeck(SHUFFLED_DECK);
    setHand(INITIAL_HAND);
    setWinner(false);
    setLoser(false);
    setHandIndex(0);
    playCardsDrawSound(INITIAL_HAND.length);
  };

  const checkGameResult = (hand : Card[]): void => {
    const acesInHand = hand.find((card) => card.rank === 'A');
    if (acesInHand) {
      setWinner(true);
      return;
    }
    setLoser(true);
  }

  useEffect(() => {
    if (deckLength > 0) {
      return;
    }
    checkGameResult(hand);
  }, [deckLength, checkGameResult]);

  return (
    <main className={styles.root}>
      <div className={styles.page}>
        <section aria-label="Cards and Aces left" className={styles.dataDisplayContainer}>
          <DataDisplay value={deckLength} label="Cards Left" />
          <DataDisplay value={acesLeft} label="Aces Left" />
        </section>

        {isWinner && (
          <motion.img
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={WinnerBanner}
            alt="Winner"
            className={styles.winnerBanner}
          />
        )}

        <Hand hand={hand} className={styles.hand} handIndex={handIndex} />

        {isWinner && (
          <motion.img
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={WinParticles}
            alt="Winner"
            className={styles.winParticles}
          />
        )}

        {deckLength > 0 && (
          <>
            <ContainedButton className={styles.dealBtn} onClick={deal}>
              Deal
            </ContainedButton>
            <TransparentButton className={styles.resetBtn} onClick={playAgain}>
              Reset
            </TransparentButton>
          </>
        )}

        {isLoser && (
          <p className={styles.youLooseText}>
            You lose. <br /> Better luck next time!
          </p>
        )}

        {deckLength === 0 && (
          <div className={styles.playAgain}>
            <TransparentButton onClick={playAgain}>Play Again</TransparentButton>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
