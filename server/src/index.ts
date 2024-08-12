/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { MovieService } from './services/MovieService';

const condition: any = {
  page: 1,
  limit: 5,
  key: '_8',
};

MovieService.find(condition).then((result) => {
  console.log(result);
});


//TODO: express server
