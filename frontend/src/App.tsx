import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import { AppContextProvider } from './lib/ctx';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import SignOutPage from './pages/auth/SignOut';
import { SignInPage } from './pages/auth/SingIn';
import { SignUpPage } from './pages/auth/SingUp';
import { EditIdeaPage } from './pages/ideas/EditIdea';
import AllIdeasPage from './pages/ideas/EditIdea/AllIdeas';
import NewIdeaPage from './pages/ideas/NewIdeaPage';
import ViewIdeaPage from './pages/ideas/ViewIdeaPage';
import { NotFoundPage } from './pages/other/NotFound';

import './styles/global.scss';

const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
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
              <Route
                path={routes.getNewIdeaRoute()}
                element={<NewIdeaPage />}
              />

              <Route
                path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
                element={<ViewIdeaPage />}
              />
              <Route
                path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)}
                element={<EditIdeaPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};

export default App;
