import React from 'react';
import styles from './Transparent.module.css';

type Props = {
  children?: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export default function TransparentButton({ children, onClick, className }: Props) {
  return (
    <>
      <button type="button" className={`${styles.default} ${className}`} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
