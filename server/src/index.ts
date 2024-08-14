/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import Express from 'express';
import MovieRouter from './routes/MovieRoute';
import UploadRouter from './routes/UploadRoute'

const app = Express();

app.use('/upload', Express.static('public/upload'));

app.use(Express.json()); // configure express to parse JSON in request's payload

app.use('/api/movie', MovieRouter);
app.use('/api/upload', UploadRouter);

app.listen(3001);
