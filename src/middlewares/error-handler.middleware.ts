import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validation.error';
import { InternalServerError } from '../errors/internal-server.error';
import { NotFoundError } from '../errors/not-found.erro';

export const errorHandler = (app: express.Express) => {
  app.use((erro: Error, req: Request, res: Response, next: NextFunction) => {
    if (erro instanceof ValidationError) {
       erro.send(res);
    
    } else if (erro instanceof NotFoundError) {
      erro.send(res);
    }
     else {
      new InternalServerError().send(res);
    }
 });
}