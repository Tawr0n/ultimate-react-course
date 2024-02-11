import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton.jsx';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton>
        <button onClick={() => navigate(-1)}>&larr; Go back</button>
      </LinkButton>
    </div>
  );
}

export default Error;
