import { ParsedQs } from 'qs';
import { IMovie } from '../db/MovieSchema';
import { ISearchResult } from '../entities/CommonTypes';
import { Movie } from '../entities/Movie';
import { SearchCondition } from '../entities/SearchCondition';
export declare class MovieService {
    static add(movie: Movie): Promise<IMovie | string[]>;
    static update(movieId: string, movie: Movie): Promise<string[]>;
    static delete(movidId: string): Promise<void>;
    static findById(movieId: string): Promise<IMovie | null>;
    static find(condition: Partial<SearchCondition> | ParsedQs): Promise<ISearchResult<IMovie>>;
    static addMockData(): Promise<void>;
    private static getRandom;
}
