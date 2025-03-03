import cn from 'classnames';
import React, { type FC } from 'react';

import styles from './index.module.scss';

export type IPropsButton = {
  children: React.ReactNode;
  loading?: boolean;
};

const Button: FC<IPropsButton> = ({ children, loading = false }) => {
  return (
    <button
      type="submit"
      className={cn({
        [styles.button]: true,
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
