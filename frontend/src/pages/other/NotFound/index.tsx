import { ErrorPageComponent } from '../../../components/errorPageComponent';

export const NotFoundPage = ({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string;
  message?: string;
}) => <ErrorPageComponent title={title} message={message} />;
