import { Order } from './order.type';
import { isAuth } from '../../middlewares/isAuthenticated';
import { OrderStore } from './order.model';
import express, { Request, Response } from 'express';
import orderSchema from './order.schema';

const orderRoutes = express.Router();
const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index({
      user_id: parseInt(req.query.user_id as string),
      status: req.query.status as string,
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id as string));
    if (!order) {
      res.status(404).json({ error: `order id:${req.params.id} not found` });
    } else {
      res.status(200).json(order);
    }
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  const user_id = req.user && req.user.id ? req.user.id : null;
  const order: Order = {
    user_id,
    status: req.body.status, //normally it should be active only
    products: req.body.products, //normally it should be active only
  };
  try {
    await orderSchema.validateAsync(order);
    const newProduct = await store.create(order);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const complete = async (req: Request, res: Response) => {
  try {
    const newProduct = await store.complete(parseInt(req.params.id as string));
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

orderRoutes.get('/orders', isAuth, index);
orderRoutes.get('/orders/:id', isAuth, show);
orderRoutes.post('/orders', isAuth, create);
orderRoutes.put('/orders/:id', isAuth, complete);

export default orderRoutes;
