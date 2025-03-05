import { createRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { useMe } from '../../lib/ctx';
import {
  getAllIdeasRoute,
  getEditProfileRoute,
  getNewIdeaRoute,
  getSignInRoute,
  getSignUpRoute,
  getSingOutRoute,
} from '../../lib/routes';
import styles from './index.module.scss';

export const layoutContentElRef = createRef<HTMLDivElement>();

const Layout = () => {
  const me = useMe();

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <ul className={styles.menu}>
          <li className={styles.item}>
            <Link className={styles.link} to={getAllIdeasRoute()}>
              <Logo className={styles.logo} />
            </Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} to={getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>

          {me ? (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to={getNewIdeaRoute()}>
                  Add new idea
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={getEditProfileRoute()}>
                  Edit profile
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to={getSingOutRoute()}>
                  Log Out ({me.nick})
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
      <div className={styles.content} ref={layoutContentElRef}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
