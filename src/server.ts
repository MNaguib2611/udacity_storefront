import { app } from './app';

const port = process.env.port || 8080;

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});
