"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const db_1 = require("../db");
const Movie_1 = require("../entities/Movie");
class MovieService {
    static add(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(movie);
            const errors = yield movie.validateThis();
            if (errors.length > 0) {
                return errors;
            }
            return yield db_1.MovieModel.create(movie);
        });
    }
    static update(movieId, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            movie = Movie_1.Movie.transform(movie);
            const errors = yield movie.validateThis();
            if (errors.length > 0) {
                return errors;
            }
            yield db_1.MovieModel.updateOne({ _id: movieId }, movie);
            return [];
        });
    }
}
exports.MovieService = MovieService;
