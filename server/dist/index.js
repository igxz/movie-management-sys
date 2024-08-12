"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const MovieService_1 = require("./services/MovieService");
const movie = {
    name: 'Matrix 2',
    types: ['action', 'AI'],
    showRegions: ['Asia', 'UK'],
    showTimeInMinutes: 400,
};
MovieService_1.MovieService.add(movie).then((result) => {
    console.log(result);
});
