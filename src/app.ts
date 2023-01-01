import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './modules/user/user.controller';
import productRoutes from './modules/product/product.controller';
import orderRoutes from './modules/orders/order.controller';

export const app: express.Application = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
