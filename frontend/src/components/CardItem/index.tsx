import tw from 'tailwind-styled-components/dist/tailwind';
import { Spade, Diamond, Clover, Heart } from '../../assets';
import { Card as CardType, Suit } from '../../types';
import styles from './Card.module.css';

// get suit source svg file
const getSuitSrc = (suit: Suit): string => {
  switch (suit) {
    case '♠':
      return Spade;
    case '♣':
      return Clover;
    case '♥':
      return Heart;
    case '♦':
      return Diamond;
    default:
      return '';
  }
};

// check if the rank text color is red depending on the suit
const isRed = (suit: Suit): boolean => {
  if (suit === '♥' || suit === '♦') return true;
  return false;
};

type StyledRankProps = {
  $isRed: boolean;
};

const StyledRank = tw.p<StyledRankProps>`
${(props: StyledRankProps) => (props.$isRed ? 'text-red-500' : 'text-black')}
  font-bold
  text-3xl
  md:text-7xl
  font-courier-prime
  text-left
`;

type CardProps = CardType & {
  className?: string;
};

export default function Card({ suit, rank, className }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      <StyledRank aria-label={`${rank} of ${suit}`} $isRed={isRed(suit)}>
        {rank}
      </StyledRank>
      <img src={getSuitSrc(suit)} className={styles.smallIcon} alt="" />
      <img src={getSuitSrc(suit)} className={styles.largeIcon} alt="" />
    </div>
  );
}
