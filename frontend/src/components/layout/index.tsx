import { Link, Outlet } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignUpRoute,
  getSingOutRoute,
} from '../../lib/routes';
import { trpc } from '../../lib/trpc';
import styles from './index.module.scss';

const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery();

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>IdeaNick</div>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>

          {isLoading || isFetching || isError ? null : data.me ? (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={getNewIdeaRoute()}>
                  Add new idea
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={getSingOutRoute()}>
                  Log Out ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={getSignUpRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={getSignInRoute()}>
                  Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <hr />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
