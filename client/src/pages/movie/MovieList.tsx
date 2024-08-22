import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import MovieTable from "../../components/MovieTable";
import { fetchMovies } from '../../redux/thunks/MovieThunks'; // Import the fetchMovies thunk

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch the fetchMovies thunk when the component mounts
    dispatch(fetchMovies({ page: 1, limit: 40, key: '' })); // Example of search conditions
  }, [dispatch]); // Empty dependency array to run once on mount

  return (
    <MovieTable />
  );
}

export default MovieList;
