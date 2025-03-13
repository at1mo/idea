import cn from 'classnames';
import React, { type FC } from 'react';

import styles from './index.module.scss';

export type IPropsButton = {
  children: React.ReactNode;
  loading?: boolean;
  color?: 'red' | 'green';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

const Button: FC<IPropsButton> = ({
  children,
  loading = false,
  color = 'green',
  type = 'submit',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={cn({
        [styles.button]: true,
        [styles[`color-${color}`]]: true,
        [styles.disabled]: disabled || loading,
        [styles.loading]: loading,
      })}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
    >
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default Button;
