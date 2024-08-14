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
  const movies = await MovieService.find(req.query);
  ResponseHelper.sendPagedData(movies, res);
});

router.post('/', async (req, res) => {
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)){
        ResponseHelper.sendError(result, res);
    }else{
        ResponseHelper.sendData(`movie added successfully! id=${result._id}`, res);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const result = await MovieService.update(movieId, req.body);
        if(result.length > 0){
            ResponseHelper.sendError(result, res);
        }else{
            ResponseHelper.sendData('movie updated successfully!', res);
        }
      } catch {
        ResponseHelper.sendError('Invalid ID', res);
      }
});

router.delete('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        await MovieService.delete(movieId);
        ResponseHelper.sendData('movie deleted successfully!', res);
      } catch {
        ResponseHelper.sendError('Invalid ID', res);
      }
});

export default router;
