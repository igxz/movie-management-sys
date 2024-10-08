/* eslint-disable @typescript-eslint/no-extraneous-class */
import axios from 'axios';
import {
  IResponseData,
  IResponseError,
  IResponsePageData,
  ISearchCondition,
} from './CommonTypes';

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
    movie: Partial<IMovie>
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

  public static async getMovieById(id: string): Promise<IResponseData<IMovie>> {
    const { data } = await axios.get('/api/movie/' + id);
    return data;
  }

  public static async getMovies(
    condition: ISearchCondition
  ): Promise<IResponsePageData<IMovie>> {

    // option 1 to delay the response
    /* return new Promise((resolve) => {
      setTimeout(async () => {
        const { data } = await axios.get('/api/movie/', { params: condition });
        resolve(data);
      }, 20);
    }); */

    const { data } = await axios.get('/api/movie/', { params: condition });

    // option 2 to delay of 30 milliseconds
    await new Promise((resolve) => setTimeout(resolve, 20));

    return data;
  }
}
