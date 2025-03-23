import Express, { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized.error.js';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { UserService } from '../services/user.service.js';
import { ForbiddenError } from '../errors/forbidden.error.js';

export const authMiddleware = (app: Express.Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "POST" && (req.url.startsWith("/auth/login")) || req.url.startsWith("/auth/recovery")) {
      return next();
    }

    const token = req.headers.authorization?.split("Bearer ")[1]

    if (token) {
      try {
        const DecodedIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)
        const user = await new UserService().getUserById(DecodedIdToken.uid);
        if (!user) {
          return next(new ForbiddenError());
        }
        req.user = user;
        return next();
      } catch (error) {
        next(new UnauthorizedError());
      }
    }

    next(new UnauthorizedError());
  });
}