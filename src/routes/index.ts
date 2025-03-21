import express from 'express';
import { usersRoutes } from './users.routes';

export const routes = ( app: express.Express) => {
  app.use(express.json());
   app.use(usersRoutes);
}