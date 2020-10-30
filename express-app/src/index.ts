import * as path from 'path';
import * as express from 'express';
import { Request, Response } from 'express';

console.log(path.join(__dirname, 'public'))

const app = express();
app.use('/public', express.static(path.join(__dirname, '../public')));

const {
  PORT = 3000,
  HOST = 'http://localhost',
} = process.env;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(PORT, () => {
  console.log(`server started at ${HOST}:${PORT}`);
});