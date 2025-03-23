import express, { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors/internal-server.error.js';
import { errors } from 'celebrate';
import { ErrorBase } from '../errors/base.error.js';

export const errorHandler = (app: express.Express) => {
  app.use(errors());
  app.use((erro: Error, req: Request, res: Response, next: NextFunction) => {
    if (erro instanceof ErrorBase) {
       erro.send(res);
    }
     else {
      new InternalServerError().send(res);
    }
 });
}