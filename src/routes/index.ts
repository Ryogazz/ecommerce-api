import express from 'express';
import { usersRoutes } from './users.routes.js';
import { authRoutes } from './auth.routes.js';
import { companyRoutes } from './companies.routes.js';
import { categoryRoutes } from './category.routes.js';
import { paymentMethodsRoutes } from './payment-methods.routes.js';
import { productRoutes } from './products.routes.js';
import { orderRoutes } from './orders.routes.js';
import { allowAnonymousUser } from '../middlewares/allow-anonymous-user.middleware.js';

export const routes = (app: express.Express) => {
  app.use(express.json({ limit: '5mb' }));
  app.use(authRoutes);
  app.use(allowAnonymousUser);
  app.use(usersRoutes);
  app.use(companyRoutes);
  app.use(categoryRoutes);
  app.use(productRoutes);
  app.use(paymentMethodsRoutes)
  app.use(orderRoutes);
}