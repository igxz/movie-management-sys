import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MovieTable: React.FC = () => {
  // Select the necessary data from the Redux store
  const data = useSelector((state: RootState) => state.movie.data);
  const isLoading = useSelector((state: RootState) => state.movie.isLoading);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Movie List Page</h2>
      <ul>
        {data.map((movie) => (
          <li key={movie._id}>{movie.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieTable;
