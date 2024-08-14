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
const SearchCondition_1 = require("../entities/SearchCondition");
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
            const transferedMovieObj = Movie_1.Movie.transform(movie);
            const errors = yield transferedMovieObj.validateThis(true);
            if (errors.length > 0) {
                return errors;
            }
            yield db_1.MovieModel.updateOne({ _id: movieId }, movie);
            return [];
        });
    }
    static delete(movidId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.MovieModel.deleteOne({ _id: movidId });
        });
    }
    static findById(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.MovieModel.findById(movieId);
            return result;
        });
    }
    static find(condition) {
        return __awaiter(this, void 0, void 0, function* () {
            const conObj = SearchCondition_1.SearchCondition.transform(condition);
            const errors = yield conObj.validateThis(true);
            if (errors.length > 0) {
                return {
                    count: 0,
                    data: [],
                    errors,
                };
            }
            const movies = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(conObj.key) },
            })
                .skip((conObj.page - 1) * conObj.limit)
                .limit(conObj.limit);
            const count = yield db_1.MovieModel.find({
                name: { $regex: new RegExp(conObj.key) },
            }).countDocuments();
            return {
                count,
                data: movies,
                errors: [],
            };
        });
    }
    static addMockData() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 20; i++) {
                const movie = new Movie_1.Movie(`movie_${i + 1}`, ['Action', 'Disaster'], ['China', 'USA'], this.getRandom(80, 400));
                yield this.add(movie).then((result) => console.log(result));
            }
        });
    }
    static getRandom(min, max) {
        const dec = max - min;
        return Math.floor(Math.random() * dec + min);
    }
}
exports.MovieService = MovieService;
