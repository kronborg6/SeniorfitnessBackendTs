import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Ts er bere ind js');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})