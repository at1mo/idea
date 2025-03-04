import type { TrpcRouterOutput } from '@ideanick/backend/src/router';
import format from 'date-fns/format';
import { useParams } from 'react-router-dom';
import LinkButton from '../../../components/linkButton';
import Segment from '../../../components/segment/segment';
import { withPageWrapper } from '../../../lib/pageWrapper';
import {
  getEditIdeaRoute,
  type TViewIdeaRouteParams,
} from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import styles from './index.module.scss';

const LikeButton = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const trpcUtils = trpc.useContext();
  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({ ideaNick: idea.nick });
      if (oldGetIdeaData?.idea) {
        const newGetIdeaData = {
          ...oldGetIdeaData,
          idea: {
            ...oldGetIdeaData.idea,
            isLikedByMe,
            likesCount: oldGetIdeaData.idea.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getIdea.setData({ ideaNick: idea.nick }, newGetIdeaData);
      }
    },
    onSuccess: () => {
      void trpcUtils.getIdea.invalidate({ ideaNick: idea.nick });
    },
  });
  return (
    <button
      className={styles.likeButton}
      onClick={() => {
        void setIdeaLike.mutateAsync({
          ideaId: idea.id,
          isLikedByMe: !idea.isLikedByMe,
        });
      }}
    >
      {idea.isLikedByMe ? 'Unlike' : 'Like'}
    </button>
  );
};

const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as TViewIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
})(({ idea, me }) => {
  return (
    <div>
      <Segment title={idea.name} description={idea.description}>
        <div className={styles.createdAt}>
          Created At: {format(idea.createdAt, 'dd.MM.yyyy')}
        </div>
        <div className={styles.author}>
          Author: {idea.author.nick}
          {idea.author.name ? ` (${idea.author.name})` : ''}
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: idea.text }}
        />

        <div className={styles.likes}>
          Likes: {idea.likesCount}
          {me && (
            <>
              <br />
              <LikeButton idea={idea} />
            </>
          )}
        </div>

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
