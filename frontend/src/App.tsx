import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import * as routes from './lib/routes';
import { TrpcProvider } from './lib/trpc';
import AllIdeasPage from './pages/AllIdeas';
import NewIdeaPage from './pages/NewIdeaPage';
import ViewIdeaPage from './pages/ViewIdeaPage';

import './styles/global.scss';

const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path={routes.getAllIdeasRoute()}
              element={<AllIdeasPage />}
            />
            <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />

            <Route
              path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)}
              element={<ViewIdeaPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  );
};

export default App;
