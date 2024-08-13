/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Response } from 'express';
import { ISearchResult } from '../entities/CommonTypes';

export class ResponseHelper {
  /*
   * response an error
   */
  public static sendError(error: string | string[], res: Response) {
    let result: string;
    if (Array.isArray(error)) {
      result = error.join(';');
    } else {
      result = error;
    }
    res.send({
      error: result,
      data: null,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static sendData(data: any, res: Response) {
    res.send({
      error: '',
      data,
    });
  }

  // paged response
  public static sendPagedData<T>(result: ISearchResult<T>, res: Response) {
    if (result.errors.length > 0) {
      this.sendError(result.errors, res);
    } else {
      res.send({ error: '', data: result.data, total: result.count });
    }
  }
}
