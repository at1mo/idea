import { TrpcProvider } from './lib/trpc';
import AllIdeasPage from './pages/AllIdeas';

const App = () => {
  return (
    <TrpcProvider>
      <AllIdeasPage />
    </TrpcProvider>
  );
};

export default App;
