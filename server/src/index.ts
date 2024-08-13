/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import Express from 'express';
import MovieRouter from './routes/MovieRoute';

const app = Express();

app.use('/api/movie', MovieRouter);

app.listen(3001);
