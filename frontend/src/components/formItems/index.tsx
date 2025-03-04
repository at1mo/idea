import React, { type FC } from 'react';

import styles from './index.module.scss';

type IPropsFormItems = {
  children: React.ReactNode;
};

const FormItems: FC<IPropsFormItems> = ({ children }) => {
  return <div className={styles.formItems}>{children}</div>;
};

export default FormItems;
