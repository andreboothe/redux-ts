import { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypeSelector';

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('');
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchRepositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {!loading && !error && (
        <ul>
          {data.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
      {loading && <h3>Loading...</h3>}
    </div>
  );
};

export default RepositoriesList;
