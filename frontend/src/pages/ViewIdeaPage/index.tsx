import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import Segment from '../../components/segment/segment';
import { type TViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './index.module.scss';

const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as TViewIdeaRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery(
    {
      ideaNick,
    }
  );

  if (isLoading || isFetching) {
    return <span>Loading data...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.idea) {
    return <span>Idea not found</span>;
  }

  return (
    <div>
      <Segment title={data.idea.name} description={data.idea.description}>
        <div className={styles.createdAt}>
          Created At: {format(data.idea.createdAt, 'dd.MM.yyyy')}
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: data.idea.text }}
        />
      </Segment>
    </div>
  );
};

export default ViewIdeaPage;
