import * as express from 'express';
import { Request, Response } from 'express';
const app = express();
const {
  PORT = 3000,
  HOST = 'http://localhost',
} = process.env;
app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello hi',
  });
});
app.listen(PORT, () => {
  console.log(`server started at ${HOST}:${PORT}`);
});