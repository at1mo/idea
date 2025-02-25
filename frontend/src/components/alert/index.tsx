import cn from 'classnames';
import React, { type FC } from 'react';

import styles from './index.module.scss';

type IPropsAlert = {
  color: 'red' | 'green';
  children: React.ReactNode;
};

const Alert: FC<IPropsAlert> = ({ children, color }) => {
  return (
    <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>
      {children}
    </div>
  );
};

export default Alert;
