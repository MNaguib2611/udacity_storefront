import { UserStore } from './../modules/user/user.model';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { TOKEN_SECRET } = process.env;
const store = new UserStore();

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    if (!authorizationHeader) {
      res
        .status(401)
        .json({ error: 'You need to login to view this resource' });
    } else {
      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        res.status(401).json({ error: 'token not found' });
      } else {
        const decoded = jwt.verify(token, TOKEN_SECRET as Secret) as JwtPayload;
        const databaseUser = await store.show(decoded.user.id);
        if (!databaseUser) {
          res.status(401).json({ error: 'User not found' });
        }
        req.user = decoded.user;
        next();
      }
    }
  } catch (error) {
    res.status(401).json({ error: 'token not valid' });
  }
};
