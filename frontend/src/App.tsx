import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import { NotAuthRouteTracker } from './components/nonAuthRouteTracker';
import { AppContextProvider } from './lib/ctx';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import { EditProfilePage } from './pages/auth/EditProfile';
import SignOutPage from './pages/auth/SignOut';
import { SignInPage } from './pages/auth/SingIn';
import { SignUpPage } from './pages/auth/SingUp';
import AllIdeasPage from './pages/ideas/AllIdeas';
import { EditIdeaPage } from './pages/ideas/EditIdea';
import NewIdeaPage from './pages/ideas/NewIdeaPage';
import ViewIdeaPage from './pages/ideas/ViewIdeaPage';
import { NotFoundPage } from './pages/other/NotFound';

import './styles/global.scss';

const App = () => {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <NotAuthRouteTracker />
            <Routes>
              <Route
                path={routes.getSignOutRoute.definition}
                element={<SignOutPage />}
              />
              <Route element={<Layout />}>
                <Route
                  path={routes.getSignUpRoute.definition}
                  element={<SignUpPage />}
                />
                <Route
                  path={routes.getSignInRoute.definition}
                  element={<SignInPage />}
                />
                <Route
                  path={routes.getEditProfileRoute.definition}
                  element={<EditProfilePage />}
                />
                <Route
                  path={routes.getAllIdeasRoute.definition}
                  element={<AllIdeasPage />}
                />
                <Route
                  path={routes.getViewIdeaRoute.definition}
                  element={<ViewIdeaPage />}
                />
                <Route
                  path={routes.getEditIdeaRoute.definition}
                  element={<EditIdeaPage />}
                />
                <Route
                  path={routes.getNewIdeaRoute.definition}
                  element={<NewIdeaPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  );
};

export default App;
