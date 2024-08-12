import Mongoose from 'mongoose';
import { Movie } from '../entities/Movie';
export interface IMovie extends Movie, Mongoose.Document {
}
declare const _default: Mongoose.Model<IMovie, {}, {}, {}, Mongoose.Document<unknown, {}, IMovie> & IMovie & Required<{
    _id: unknown;
}>, any>;
export default _default;
