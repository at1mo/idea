import type { TrpcRouterOutput } from '@ideanick/backend/src/router';
import { canBlockIdeas, canEditIdea } from '@ideanick/backend/src/utils/can';
import {
  getAvatarUrl,
  getCloudinaryUploadUrl,
} from '@ideanick/shared/src/cloudinary';
import format from 'date-fns/format';
import ImageGallery from 'react-image-gallery';
import Alert from '../../../components/alert';
import Button from '../../../components/button';
import FormItems from '../../../components/formItems';
import { Icon } from '../../../components/icon';
import LinkButton from '../../../components/linkButton';
import Segment from '../../../components/segment/segment';
import { useForm } from '../../../lib/form';
import { mixpanelSetIdeaLike } from '../../../lib/mixpanel';
import { withPageWrapper } from '../../../lib/pageWrapper';
import { getEditIdeaRoute, getViewIdeaRoute } from '../../../lib/routes';
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
        void setIdeaLike
          .mutateAsync({
            ideaId: idea.id,
            isLikedByMe: !idea.isLikedByMe,
          })
          .then(({ idea: { isLikedByMe } }) => {
            if (isLikedByMe) {
              mixpanelSetIdeaLike(idea);
            }
          });
      }}
    >
      <Icon
        size={32}
        className={styles.likeIcon}
        name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'}
      />
    </button>
  );
};

const BlockIdea = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const blockIdea = trpc.blockIdea.useMutation();
  const trpcUtils = trpc.useContext();
  const { formik, alertProps, buttonProps } = useForm({
    onSubmit: async () => {
      await blockIdea.mutateAsync({ ideaId: idea.id });
      await trpcUtils.getIdea.refetch({ ideaNick: idea.nick });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Alert {...alertProps} />
        <Button color="red" {...buttonProps}>
          Block Idea
        </Button>
      </FormItems>
    </form>
  );
};

const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = getViewIdeaRoute.useParams();
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    idea: checkExists(queryResult.data.idea, 'Idea not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
  title: ({ idea }) => idea.name,
})(({ idea, me }) => {
  return (
    <div>
      <Segment title={idea.name} description={idea.description}>
        <div className={styles.createdAt}>
          Created At: {format(idea.createdAt, 'dd.MM.yyyy')}
        </div>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            alt=""
            src={getAvatarUrl(idea.author.avatar, 'small')}
          />
          <div className={styles.name}>
            Author:
            <br />
            {idea.author.nick}
            {idea.author.name ? ` (${idea.author.name})` : ''}
          </div>
        </div>

        {!!idea.images.length && (
          <div className={styles.gallery}>
            <ImageGallery
              showPlayButton={false}
              showFullscreenButton={false}
              items={idea.images.map((image) => ({
                original: getCloudinaryUploadUrl(image, 'image', 'large'),
                thumbnail: getCloudinaryUploadUrl(image, 'image', 'preview'),
              }))}
            />
          </div>
        )}

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

        {canEditIdea(me, idea) && (
          <div className={styles.editButton}>
            <LinkButton to={getEditIdeaRoute({ ideaNick: idea.nick })}>
              Edit Idea
            </LinkButton>
          </div>
        )}

        {canBlockIdeas(me) && (
          <div className={styles.blockIdea}>
            <BlockIdea idea={idea} />
          </div>
        )}
      </Segment>
    </div>
  );
});

export default ViewIdeaPage;
