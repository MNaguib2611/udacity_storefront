import { isAuth } from '../../middlewares/isAuthenticated';
import { UserStore } from './user.model';
import { User, UserLogin } from './user.type';
import express, { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
const userRoutes = express.Router();

const store = new UserStore();
const { TOKEN_SECRET } = process.env;

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id as string));
    if (!user) {
      res.status(404).json({ error: `user id:${req.params.id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, TOKEN_SECRET as Secret);
    res.status(201).json({ ...newUser, token });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const u: UserLogin = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await store.authenticate(u.username, u.password);
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(401).json({ error: 'failed to authenticate user' });
    }
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

userRoutes.get('/users', isAuth, index);
userRoutes.get('/users/:id', isAuth, show);
userRoutes.post('/users', create);
userRoutes.post('/authenticate', authenticate);

export default userRoutes;
