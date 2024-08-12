import { IMovie } from '../db/MovieSchema';
import { Movie } from '../entities/Movie';
export declare class MovieService {
    static add(movie: Movie): Promise<IMovie | string[]>;
    static update(movieId: string, movie: Movie): Promise<string[]>;
}
