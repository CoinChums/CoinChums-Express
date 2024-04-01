import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new ForbiddenException('encodedToken not found in headers');
    }
    const JwtData = jwt.verify(
      req.headers.authorization?.split(' ')[1],
      process.env.JWT_SECRET_KEY,
    );
    if (JwtData?.email) {
      next();
    } else {
      throw new ForbiddenException('Invalid encoded Token');
    }
  }
}
