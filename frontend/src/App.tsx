import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import AllIdeasPage from './pages/AllIdeas';
import { EditIdeaPage } from './pages/EditIdea';
import NewIdeaPage from './pages/NewIdeaPage';
import SignOutPage from './pages/SignOut';
import { SignInPage } from './pages/SingIn';
import { SignUpPage } from './pages/SingUp';
import ViewIdeaPage from './pages/ViewIdeaPage';

import './styles/global.scss';

const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.getSingOutRoute()} element={<SignOutPage />} />
          <Route element={<Layout />}>
            <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
            <Route path={routes.getSignInRoute()} element={<SignInPage />} />

            <Route
              path={routes.getAllIdeasRoute()}
              element={<AllIdeasPage />}
            />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />

            <Route
              path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
              element={<ViewIdeaPage />}
            />
            <Route
              path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)}
              element={<EditIdeaPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};

export default App;
