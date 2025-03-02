import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import LinkButton from '../../components/linkButton';
import Segment from '../../components/segment/segment';
import { withPageWrapper } from '../../lib/pageWrapper';
import { getEditIdeaRoute, type TViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './index.module.scss';

const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as TViewIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  setProps: ({ queryResult, ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    idea: queryResult.data.idea!,
    me: ctx.me,
  }),
})(({ idea, me }) => {
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
});

export default ViewIdeaPage;
