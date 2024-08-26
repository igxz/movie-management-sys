import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import MovieTable from "../../components/MovieTable";
import { deleteMovie, fetchMovies } from '../../redux/thunks/MovieThunks'; // Import the fetchMovies thunk
import { updateMovieToggleProperties } from '../../redux/thunks/MovieThunks';
import { SwitchType } from '../../services/CommonTypes';

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch the fetchMovies thunk when the component mounts
    dispatch(fetchMovies({ page: 1, limit: 40, key: '' })); // Example of search conditions
  }, [dispatch]); // Empty dependency array to run once on mount

    // Memoized function to handle switch changes
    const handleSwitchChange = useCallback(
      (checked: boolean, movieId: string, switchType: SwitchType) => {
        dispatch(updateMovieToggleProperties(checked, movieId, switchType));
      },
      [dispatch]
    );

    // Memoized function to handle delete
    const handleDelete = useCallback(
      async (id: string) => {
        await dispatch(deleteMovie(id));
      },
      [dispatch],
    )
    

  return (
    <MovieTable onSwitchChange={handleSwitchChange} onDelete={handleDelete}/>
  );
}

export default MovieList;
