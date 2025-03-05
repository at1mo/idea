import cn from 'classnames';
import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

type IPropsButton = {
  children: React.ReactNode;
  to: string;
  color?: 'red' | 'green';
};

const LinkButton: FC<IPropsButton> = ({ children, to, color = 'green' }) => {
  return (
    <Link
      className={cn({
        [styles.button]: true,
        [styles[`color-${color}`]]: true,
      })}
      to={to}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
