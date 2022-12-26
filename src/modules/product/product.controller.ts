import { Product } from './product.type';
import { isAuth } from '../../middlewares/isAuthenticated';
import { ProductStore } from './product.model';
import express, { Request, Response } from 'express';

const productRoutes = express.Router();
const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index({ category: req.query.category as string });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id as string));
    if (!product) {
      res.status(404).json({ error: `product id:${req.params.id} not found` });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const newProduct = await store.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

productRoutes.get('/products', index);
productRoutes.get('/products/:id', show);
productRoutes.post('/products', isAuth, create);

export default productRoutes;
