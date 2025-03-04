import { zGetIdeasTrpcInput } from '@ideanick/backend/src/router/ideas/getIdeas/input';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import Alert from '../../../components/alert';
import Input from '../../../components/input';
import { layoutContentElRef } from '../../../components/layout';
import { Loader } from '../../../components/loader';
import Segment from '../../../components/segment/segment';
import { useForm } from '../../../lib/form';
import { getViewIdeaRoute } from '../../../lib/routes';
import { trpc } from '../../../lib/trpc';
import styles from './index.module.scss';

const AllIdeasPage = () => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetIdeasTrpcInput.pick({ search: true }),
  });
  const search = useDebounce(formik.values.search, 500);
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getIdeas.useInfiniteQuery(
    {
      search,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <Segment title="All ideas">
      <div className={styles.filter}>
        <Input maxWidth={'100%'} label="search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].ideas.length ? (
        <Alert color="brown">Nothing found by search</Alert>
      ) : (
        <div className={styles.ideas}>
          <InfiniteScroll
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            threshold={250}
            loader={
              <div className={styles.more} key="loader">
                <Loader type="section" />
              </div>
            }
            getScrollParent={() => layoutContentElRef.current}
            useWindow={
              (layoutContentElRef.current &&
                getComputedStyle(layoutContentElRef.current).overflow) !==
              'auto'
            }
          >
            {data.pages
              .flatMap((page) => page.ideas)
              .map((idea) => (
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
                  >
                    Likes: {idea.likesCount}
                  </Segment>
                </div>
              ))}
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};

export default AllIdeasPage;
