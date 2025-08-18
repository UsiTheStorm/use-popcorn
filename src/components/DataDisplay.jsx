import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

function DataDisplay({ isLoading, error, children }) {
  if (isLoading) return <Loader />;

  if (error) return <ErrorMessage message={error} />;

  return children;
}

export default DataDisplay;
