import imgNotFound from '../../../assets/images/not_found.svg';
import { ErrorPageComponent } from '../../../components/errorPageComponent';
import styles from './index.module.scss';

export const NotFoundPage = ({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <ErrorPageComponent title={title} message={message}>
      <img className={styles.img} src={imgNotFound} alt="not found" />
    </ErrorPageComponent>
  );
};
