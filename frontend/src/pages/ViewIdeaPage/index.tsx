import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import LinkButton from '../../components/linkButton';
import Segment from '../../components/segment/segment';
import { getEditIdeaRoute, type TViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './index.module.scss';

const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as TViewIdeaRouteParams;

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (
    getIdeaResult.isLoading ||
    getIdeaResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading data...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getIdeaResult.data.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data.idea;
  const me = getMeResult.data.me;

  return (
    <div>
      <Segment title={idea.name} description={idea.description}>
        <div className={styles.createdAt}>
          Created At: {format(idea.createdAt, 'dd.MM.yyyy')}
        </div>
        <div className={styles.author}>Author: {idea.author.nick}</div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: idea.text }}
        />
        {me?.id === idea.authorId && (
          <div className={styles.editButton}>
            <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
              Edit Idea
            </LinkButton>
          </div>
        )}
      </Segment>
    </div>
  );
};

export default ViewIdeaPage;
