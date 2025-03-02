import { Link } from 'react-router-dom';
import Segment from '../../../../components/segment/segment';
import { getViewIdeaRoute } from '../../../../lib/routes';
import { trpc } from '../../../../lib/trpc';
import styles from './index.module.scss';

const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading data...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Segment title="All ideas">
      <div className={styles.ideas}>
        {data.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <Segment
              size={2}
              title={
                <Link
                  className={styles.ideaLink}
                  to={getViewIdeaRoute({ ideaNick: idea.nick })}
                >
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};

export default AllIdeasPage;
