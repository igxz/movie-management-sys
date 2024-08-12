/* eslint-disable @typescript-eslint/no-extraneous-class */
import { MovieModel } from '../db';
import { IMovie } from '../db/MovieSchema';
import { ISearchResult } from '../entities/CommonTypes';
import { Movie } from '../entities/Movie';
import { SearchCondition } from '../entities/SearchCondition';
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
    const transferedMovieObj = Movie.transform(movie);

    //2. class validation
    const errors = await transferedMovieObj.validateThis(true);
    if (errors.length > 0) {
      return errors;
    }

    //3. update movie in database
    await MovieModel.updateOne({ _id: movieId }, movie);
    return [];
  }

  public static async delete(movidId: string): Promise<void> {
    await MovieModel.deleteOne({ _id: movidId });
  }

  public static async findById(movieId: string): Promise<IMovie | null> {
    const result = await MovieModel.findById(movieId);
    return result;
  }

  public static async find(
    condition: SearchCondition
  ): Promise<ISearchResult<IMovie>> {
    //1. class transformation
    const conObj = SearchCondition.transform(condition);

    //2. class validation
    const errors = await conObj.validateThis(true);
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors,
      };
    }

    //3. database lookup
    const movies = await MovieModel.find({
      name: { $regex: new RegExp(conObj.key) },
    })
      .skip((conObj.page - 1) * conObj.limit)
      .limit(conObj.limit);
    const count = await MovieModel.find({
      name: { $regex: new RegExp(conObj.key) },
    }).countDocuments();

    return {
      count,
      data: movies,
      errors: [],
    };
  }

  public static async addMockData(): Promise<void> {
    for (let i = 0; i < 20; i++) {
      const movie = new Movie(
        `movie_${i + 1}`,
        ['Action', 'Disaster'],
        ['China', 'USA'],
        this.getRandom(80, 400)
      );

      await this.add(movie).then((result) => console.log(result));
    }
  }

  private static getRandom(min: number, max: number) {
    const dec = max - min;
    return Math.floor(Math.random() * dec + min);
  }
}
