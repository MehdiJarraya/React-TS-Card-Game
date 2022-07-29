import React from 'react';
import styles from './DataDisplay.module.css';

type Props = {
  label: string;
  value: number;
  className?: string;
};

export default function DataDisplay({ label, value, className }: Props) {
  return (
    <div className={`${styles.default} ${className}`}>
      <h2 className={styles.value}>{value}</h2>
      <h3 className={styles.label}>{label}</h3>
    </div>
  );
}
