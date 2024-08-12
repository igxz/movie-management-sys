import Mongoose from 'mongoose';
import { Movie } from '../entities/Movie';

export interface IMovie extends Movie, Mongoose.Document {}

const movieSchema = new Mongoose.Schema<IMovie>(
  {
    name: String,
    types: [String],
    showRegions: [String],
    showTimeInMinutes: Number,
    isPopular: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    description: String,
    poster: String,
  },
  {
    versionKey: false,
  }
);

export default Mongoose.model<IMovie>('MovieModel',movieSchema);