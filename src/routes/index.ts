import express from 'express';
import { usersRoutes } from './users.routes.js';
import { authRoutes } from './auth.routes.js';
import { companyRoutes } from './companies.routes.js';
import { categoryRoutes } from './category.routes.js';

export const routes = (app: express.Express) => {
  app.use(express.json({ limit: '5mb' }));
  app.use(authRoutes);
  app.use(usersRoutes);
  app.use(companyRoutes);
  app.use(categoryRoutes);
}