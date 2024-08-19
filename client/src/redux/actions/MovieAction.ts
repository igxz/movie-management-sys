
import { IAction } from './ActionTypes';
import { IMovie, MovieService } from '../../services/MovieService';
import { ISearchCondition } from '../../services/CommonTypes';
import { ThunkAction } from "redux-thunk";
import { RootState } from '../reducers/RootReducer';


export type SaveMoviesAction = IAction<
  'movie_save',
  { movies: IMovie[]; total: number }
>;

export type DeleteMoviesAction = IAction<
  'movie_delete',
  string
>

export type SetLoadingAction = IAction<'movie_setLoading', boolean>;

export type SetSearchConditionAction = IAction<'movie_setSearchCondition', ISearchCondition>;

const saveMoviesAction = (
  movies: IMovie[],
  total: number
): SaveMoviesAction => ({
  type: 'movie_save',
  payload: { movies, total },
});

const deleteMovieAction = (
    movieId: string,
  ): DeleteMoviesAction => ({
    type: 'movie_delete',
    payload: movieId,
  });

const setLoadingAction = (isLoading: boolean): SetLoadingAction => ({
  type: 'movie_setLoading',
  payload: isLoading,
});

const setSearchCriteriaAction = (sc: ISearchCondition): SetSearchConditionAction => ({
    type: 'movie_setSearchCondition',
    payload: sc,
  });

export type MovieActionTypes = SaveMoviesAction | DeleteMoviesAction | SetLoadingAction | SetSearchConditionAction


// fetch movies from the database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchMovies = (condition: ISearchCondition) : ThunkAction<Promise<void>, RootState, any, MovieActionTypes> => {
  return async (dispatch, getState) => {
    //1. set loading state to true
    dispatch(setLoadingAction(true));

    //2. set search conditions
    dispatch(setSearchCriteriaAction(condition)); 

    //3. fetch movies from database via MoviesService
    const currentCondition = getState().movie.searchCriteria;
    const result = await MovieService.getMovies(currentCondition);

    //4. update states in store
    if(!result.error){
      dispatch(saveMoviesAction(result.data,result.total));
    }
    
    //5. set loading state to false
    dispatch(setLoadingAction(false));
  }
}

export default {
  saveMoviesAction,
  setLoadingAction,
  setSearchCriteriaAction,
  deleteMovieAction,
  fetchMovies
};
