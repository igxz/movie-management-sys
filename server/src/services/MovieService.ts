/* eslint-disable @typescript-eslint/no-extraneous-class */
import { MovieModel } from '../db';
import { IMovie } from '../db/MovieSchema';
import { Movie } from '../entities/Movie';

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    //1. class transformation
    movie = Movie.transform(movie);

    //2. class validation
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return errors;
    }

    //3. add to database
    return await MovieModel.create(movie);
  }

  public static async update(movieId: string, movie: Movie): Promise<string[]> {
    //1. class transformation
    movie = Movie.transform(movie);

    //2. class validation
    const errors = await movie.validateThis();
    if (errors.length > 0) {
      return errors;
    }

    //3. update movie in database
    await MovieModel.updateOne({ _id: movieId }, movie);
    return [];
  }
}
