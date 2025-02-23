import { useParams } from 'react-router-dom';
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
      <h1 className={styles.title}>{data.idea.name}</h1>
      <p className={styles.description}>{data.idea.description}</p>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: data.idea.text }}
      />
    </div>
  );
};

export default ViewIdeaPage;
