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
  totalPages: number;
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
  totalPages: 0,
};

const saveMovie: MovieReducer<SaveMoviesAction> = (
  state = defaultState,
  action
) => {
  return {
    ...state,
    data: action.payload.movies,
    total: action.payload.total,
    totalPages: Math.ceil(action.payload.total / state.searchCriteria.limit),
  };
};

const setMovieSearchCriteria: MovieReducer<SetSearchConditionAction> = (
  state = defaultState,
  action
) => {
  const newState = {
    ...state,
    searchCriteria: {
      ...state?.searchCriteria,
      ...action.payload,
    },
  };
  newState.totalPages = Math.ceil(
    newState.total / newState.searchCriteria.limit
  );
  return newState;
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
    totalPages: Math.ceil((state.total - 1) / state.searchCriteria.limit),
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
