import { motion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';
import { Card } from '../../types';
import CardItem from '../CardItem';
import styles from './Hand.module.css';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const item = {
  hidden: { y: -200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type Props = {
  hand: Card[];
  className?: string;
  handIndex: number;
};
export default function Hand({ hand, className, handIndex }: Props) {
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');
  const numberOfCards = hand.length;

  // get rotate and margin top additional classNames depending on the card index in the hand
  const getAdditionalPositioningClassName = (index: number): string => {
    // keep default position if the screen is small or the number of cards is not exactly 5
    if (!isLargeScreen || numberOfCards !== 5) return '';
    // rotate and apply the margin depending on the index
    switch (index) {
      case 0:
        return 'rotate-[15deg]';
      case 1:
        return 'rotate-[7.5deg] mt-12';
      case 2:
        return 'rotate-[0deg] mt-16';
      case 3:
        return 'rotate-[-7.5deg] mt-12';
      case 4:
        return 'rotate-[-15deg]';
      default:
        return '';
    }
  };

  return (
    <motion.section
      // to trigger the animation on handIndex change
      key={handIndex}
      className={`${styles.default} ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
      aria-label="Cards in hand"
    >
      {hand.map((card, index) => (
        <motion.div key={index} variants={item}>
          {/*  */}
          {/* Pass additional rotation and margin top classnames to the CardItem component to display in the correct position and rotation */}
          <CardItem {...card} className={getAdditionalPositioningClassName(index)} />
        </motion.div>
      ))}
    </motion.section>
  );
}
