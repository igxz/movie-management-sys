import 'reflect-metadata';
import { MovieService } from './services/MovieService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const movie: any = {
  name: 'Matrix 2',
  types: ['action', 'AI'],
  showRegions: ['Asia', 'UK'],
  showTimeInMinutes: 400,
};

MovieService.add(movie).then((result) => {
  console.log(result);
});

//TODO: express server
