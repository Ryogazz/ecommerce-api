import express, { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found.erro';

export const pageNotFoundHandler = (app: express.Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError('Página não encontrada'));
  });
}