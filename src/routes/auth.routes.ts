import { Router } from 'express';
import asyncHeadler from 'express-async-handler';
import { AuthController } from '../controllers/auth.controller';
import { celebrate, Segments } from 'celebrate';
import { authLoginSchema, authRecoverySchema } from '../models/user.model';

export const authRoutes = Router();

authRoutes.post("/auth/login", celebrate({[Segments.BODY]: authLoginSchema}), asyncHeadler(AuthController.login));
authRoutes.post("/auth/recovery", celebrate({[Segments.BODY]: authRecoverySchema}), asyncHeadler(AuthController.recovery));