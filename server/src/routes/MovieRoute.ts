import Express from 'express';
import { MovieService } from '../services/MovieService';
import { ResponseHelper } from './ResponseHelper';

const router = Express.Router();

router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await MovieService.findById(movieId);
    ResponseHelper.sendData(movie, res);
  } catch {
    ResponseHelper.sendData(null, res);
  }
});

router.get('/', async (req, res) => {
  // res.send(req.query);
  // Transform req.query into an instance of SearchCondition
  // const searchCondition = SearchCondition.transform(req.query);

  // Pass the transformed object to the MovieService
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const movies = await MovieService.find(req.query as any as SearchCondition);
  const movies = await MovieService.find(req.query);
  ResponseHelper.sendPagedData(movies, res);
});

router.post('/', (req, res) => {
  res.send('post request');
});

router.put('/', (req, res) => {
  res.send('put request');
});

router.delete('/', (req, res) => {
  res.send('delete request');
});

export default router;
