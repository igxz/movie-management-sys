// movie list status

import { Action, Reducer } from 'redux';
import { ISearchCondition } from '../../services/CommonTypes';
import { IMovie } from '../../services/MovieService';
import {
  DeleteMoviesAction,
  MovieActionTypes,
  SaveMoviesAction,
  SetLoadingAction,
  SetSearchConditionAction,
} from '../actions/MovieAction';

export type IMovieSearchCriteria = Required<ISearchCondition>;

export type MovieReducer<A extends Action<string>> = Reducer<IMovieState, A>;

export interface IMovieState {
  data: IMovie[];
  searchCriteria: IMovieSearchCriteria;
  total: number;
  isLoading: boolean;
}

const defaultState: IMovieState = {
  data: [],
  searchCriteria: {
    page: 1,
    limit: 10,
    key: '',
  },
  total: 0,
  isLoading: false,
};

const saveMovie: MovieReducer<SaveMoviesAction> = (
  state = defaultState,
  action
) => {
  return {
    ...state,
    data: action.payload.movies,
    total: action.payload.total,
  };
};

const setMovieSearchCriteria: MovieReducer<SetSearchConditionAction> = (
  state = defaultState,
  action
) => {
  return {
    ...state,
    searchCriteria: {
      ...state?.searchCriteria,
      ...action.payload,
    },
  };
};

const setIsLoading: MovieReducer<SetLoadingAction> = (
  state = defaultState,
  action
) => {
  return {
    ...state,
    isLoading: action.payload,
  };
};

const deleteMovie: MovieReducer<DeleteMoviesAction> = (
  state = defaultState,
  action
) => {
  return {
    ...state,
    data: state.data.filter((m) => m._id !== action.payload),
    total: state.total - 1,
  };
};

const movieReducer = (
  state: IMovieState = defaultState,
  action: MovieActionTypes
): IMovieState => {
  switch (action.type) {
    case 'movie_delete':
      return deleteMovie(state, action);
    case 'movie_save':
      return saveMovie(state, action);
    case 'movie_setSearchCondition':
      return setMovieSearchCriteria(state, action);
    case 'movie_setLoading':
      return setIsLoading(state, action);
    default:
      return state;
  }
};

export default movieReducer;
