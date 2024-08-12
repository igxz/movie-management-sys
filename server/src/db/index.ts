import Mongoose from 'mongoose';
import MovieModel from './MovieSchema';

Mongoose.connect('mongodb://localhost:27017/moviedb').then(() => {
  console.log('connect to database successfully!');
});

export { MovieModel };
