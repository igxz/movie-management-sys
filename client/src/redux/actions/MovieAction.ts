import { IAction } from './ActionTypes';
import { IMovie } from '../../services/MovieService';
import { ISearchCondition, SwitchType } from '../../services/CommonTypes';

export type SaveMoviesAction = IAction<
  'movie_save',
  { movies: IMovie[]; total: number }
>;

export type DeleteMoviesAction = IAction<'movie_delete', string>;

export type SetLoadingAction = IAction<'movie_setLoading', boolean>;

export type SetSearchConditionAction = IAction<
  'movie_setSearchCondition',
  ISearchCondition
>;

export type UpdateSwitchAction = IAction<
  'movie_updateSwitchAction',
  { newVal: boolean; movieId: string; type: SwitchType }
>;

const saveMoviesAction = (
  movies: IMovie[],
  total: number
): SaveMoviesAction => ({
  type: 'movie_save',
  payload: { movies, total },
});

const deleteMovieAction = (movieId: string): DeleteMoviesAction => ({
  type: 'movie_delete',
  payload: movieId,
});

const setLoadingAction = (isLoading: boolean): SetLoadingAction => ({
  type: 'movie_setLoading',
  payload: isLoading,
});

const setSearchCriteriaAction = (
  sc: ISearchCondition
): SetSearchConditionAction => ({
  type: 'movie_setSearchCondition',
  payload: sc,
});

const changeSwitchAction = (
  newVal: boolean,
  movieId: string,
  type: SwitchType
): UpdateSwitchAction => ({
  type: 'movie_updateSwitchAction',
  payload: {
    newVal,
    movieId,
    type,
  },
});

export type MovieActionTypes =
  | SaveMoviesAction
  | DeleteMoviesAction
  | SetLoadingAction
  | SetSearchConditionAction
  | UpdateSwitchAction;

export default {
  saveMoviesAction,
  setLoadingAction,
  setSearchCriteriaAction,
  deleteMovieAction,
  changeSwitchAction,
};
