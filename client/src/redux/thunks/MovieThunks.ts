import { ThunkAction } from 'redux-thunk';
import { ISearchCondition } from '../../services/CommonTypes';
import { MovieService } from '../../services/MovieService';
import MovieAction, { MovieActionTypes } from '../actions/MovieAction';
import { RootState } from '../store';

// fetch movies from the database
const fetchMovies = (
  condition: ISearchCondition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ThunkAction<Promise<void>, RootState, any, MovieActionTypes> => {
  return async (dispatch, getState) => {
    //1. set loading state to true
    dispatch(MovieAction.setLoadingAction(true));

    //2. set search conditions
    dispatch(MovieAction.setSearchCriteriaAction(condition));

    //3. fetch movies from database via MoviesService
    const currentCondition = getState().movie.searchCriteria;
    const result = await MovieService.getMovies(currentCondition);

    //4. update states in store
    if (!result.error) {
      dispatch(MovieAction.saveMoviesAction(result.data, result.total));
    }

    //5. set loading state to false
    dispatch(MovieAction.setLoadingAction(false));
  };
};

//delete a movie from the database
const deleteMovie = (
  id: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ThunkAction<Promise<void>, RootState, any, MovieActionTypes> => {
  return async (dispatch) => {
    //1. set loading state to true
    dispatch(MovieAction.setLoadingAction(true));

    //2. delete selected movie from the database
    await MovieService.delete(id);

    //3. delete selected movie from the store
    dispatch(MovieAction.deleteMovieAction(id));

    //4. set loading state to false
    dispatch(MovieAction.setLoadingAction(false));
  };
};

export default {
  fetchMovies,
  deleteMovie,
};
