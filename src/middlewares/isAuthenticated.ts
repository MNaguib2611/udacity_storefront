import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
const { TOKEN_SECRET } = process.env;

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    if (!authorizationHeader) {
      res.status(401).json({ error: 'No authorization header was found' });
    } else {
      const token = authorizationHeader.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'token not found' });
      } else {
        const decoded = jwt.verify(token, TOKEN_SECRET as Secret);
        next();
      }
    }
  } catch (error) {
    res.status(402).json({ error: 'token not valid' });
  }
};
