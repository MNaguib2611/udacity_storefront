import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './modules/user/users.controller';

const app: express.Application = express();
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

app.listen(3000, function () {
  console.log(`starting app on: ${3000}`);
});
