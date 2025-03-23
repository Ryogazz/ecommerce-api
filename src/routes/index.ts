import express from 'express';
import { usersRoutes } from './users.routes';
import { authRoutes } from './auth.routes';
import { companyRoutes } from './companies.routes';

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(authRoutes);
  app.use(usersRoutes);
  app.use(companyRoutes);
}