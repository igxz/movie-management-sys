import React, { useCallback, useEffect } from 'react';
import { useAppDispatch } from '../../redux/store';
import MovieTable from "../../components/MovieTable";
import MovieAction from "../../redux/actions/MovieAction";
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

    // Memoized function to handle keywoard chenge
    const handleSearchKeyChange = useCallback(
      (keyword: string) => {
       dispatch(MovieAction.setSearchCriteriaAction({key: keyword}));
     },
     [dispatch],
    )
     // Memoized function to handle new keywords search
    const handleSearch = useCallback(
      () => {
       dispatch(fetchMovies({ page: 1}));
     },
     [dispatch],
   )
    

  return (
    <>
    <h2>Movie List Page</h2>
    <MovieTable onSwitchChange={handleSwitchChange} onDelete={handleDelete} onChange={handleChange} onSearchKeyChange={handleSearchKeyChange} onSearch={handleSearch}/>
    </>
  );
}

export default MovieList;
