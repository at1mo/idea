import Alert from '../alert';
import Segment from '../segment/segment';

export const ErrorPageComponent = ({
  title = 'Oops, error',
  message = 'Something went wrong',
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <Segment title={title}>
      <Alert color="red">{message}</Alert>
    </Segment>
  );
};
