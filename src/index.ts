import express from 'express';
import { initializeApp as initializeAdminApp } from 'firebase-admin/app';
import { initializeApp as initializeFirebaseApp } from "firebase/app"
import {routes} from './routes/index';
import { errorHandler } from './middlewares/error-handler.middleware';
import { pageNotFoundHandler } from './middlewares/page-not-found.middleware';
import { authMiddleware } from './middlewares/auth.middleware';

initializeAdminApp();
initializeFirebaseApp({
  apiKey: process.env.API_KEY,
});
const app = express();
authMiddleware(app);
routes(app);
pageNotFoundHandler(app);
errorHandler(app);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});