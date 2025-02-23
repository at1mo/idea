import { Link } from 'react-router-dom';
import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } =
    trpc.getIdeas.useQuery();

  if (isLoading || isFetching) {
    return <span>Loading data...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h1>All ideas:</h1>
      {data.ideas.map((idea) => (
        <div key={idea.nick}>
          <h3>
            <Link to={getViewIdeaRoute({ ideaNick: idea.nick })}>
              {idea.name}
            </Link>
          </h3>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllIdeasPage;
