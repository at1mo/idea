import cn from 'classnames';
import React, { type FC } from 'react';

import styles from './index.module.scss';

export type IPropsButton = {
  children: React.ReactNode;
  loading?: boolean;
  color?: 'red' | 'green';
};

const Button: FC<IPropsButton> = ({
  children,
  loading = false,
  color = 'green',
}) => {
  return (
    <button
      type="submit"
      className={cn({
        [styles.button]: true,
        [styles[`color-${color}`]]: true,
        [styles.disabled]: loading,
        [styles.loading]: loading,
      })}
      disabled={loading}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;
