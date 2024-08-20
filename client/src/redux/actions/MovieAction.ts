
import { IAction } from './ActionTypes';
import { IMovie } from '../../services/MovieService';
import { ISearchCondition } from '../../services/CommonTypes';


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

export default {
  saveMoviesAction,
  setLoadingAction,
  setSearchCriteriaAction,
  deleteMovieAction
};
