/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from 'axios';
import { IResponseData, IResponseError, IResponsePageData, ISearchCondition } from './CommonTypes';

export interface IMovie {
  _id?: string;
  name: string;
  types: string[];
  showRegions: string[];
  showTimeInMinutes: number;
  isComing: boolean;
  isPopular: boolean;
  isClassic: boolean;
  description?: string;
  poster?: string;
}

export class MovieService {

  public static async add(
    movie: IMovie
  ): Promise<IResponseData<IMovie> | IResponseError> {
    const { data } = await axios.post('/api/movie', movie);
    return data;
  }

  public static async update(
    id: string,
    movie: IMovie
  ): Promise<IResponseData<string> | IResponseError> {
    const { data } = await axios.put('/api/movie/' + id, movie);
    return data;
  }

  public static async delete(
    id: string
  ): Promise<IResponseData<string> | IResponseError> {
    const { data } = await axios.delete('/api/movie/' + id);
    return data;
  }

  public static async getMovieById(
    id: string
  ): Promise<IResponseData<IMovie >> {
    const { data } = await axios.get('/api/movie/' + id);
    return data;
  }

  public static async getMovies(condition: ISearchCondition): Promise<IResponsePageData<IMovie>> {
    const {data} = await axios.get('/api/movie/', {params: condition});
    return data;
  }
}
