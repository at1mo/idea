import { Link, Outlet } from 'react-router-dom';
import {
  getAllIdeasRoute,
  getNewIdeaRoute,
  getSignUpRoute,
} from '../../lib/routes';
import styles from './index.module.scss';

const Layout = () => {
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
          <li className={styles.item}>
            <Link className={styles.link} to={getNewIdeaRoute()}>
              Add new idea
            </Link>
          </li>

          <li className={styles.item}>
            <Link className={styles.link} to={getSignUpRoute()}>
              Sign Up
            </Link>
          </li>
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
