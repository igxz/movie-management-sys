import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import MovieTable from "../../components/MovieTable";
import { deleteMovie, fetchMovies, updateMovieToggleProperties} from '../../redux/thunks/MovieThunks'; // Import the fetchMovies thunk
import { SwitchType } from '../../services/CommonTypes';

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Dispatch the fetchMovies thunk when the component mounts
    dispatch(fetchMovies({ page: 1, limit: 8, key: '' })); // Example of search conditions
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

    // Memoized function to handle new page
    const handleChange = useCallback(
       (newPage: number) => {
        dispatch(fetchMovies({ page: newPage}));
      },
      [dispatch],
    )
    

  return (
    <MovieTable onSwitchChange={handleSwitchChange} onDelete={handleDelete} onChange={handleChange}/>
  );
}

export default MovieList;
