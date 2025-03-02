import cn from 'classnames';
import React, { type FC } from 'react';

import styles from './index.module.scss';

export type IPropsAlert = {
  color: 'red' | 'green';
  children: React.ReactNode;
  hidden?: boolean;
};

const Alert: FC<IPropsAlert> = ({ children, color, hidden }) => {
  if (hidden) {
    return null;
  }
  return (
    <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>
      {children}
    </div>
  );
};

export default Alert;
