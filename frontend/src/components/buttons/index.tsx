import React from 'react';
import styles from './index.module.scss';

const Buttons = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.buttons}>{children}</div>;
};

export default Buttons;
