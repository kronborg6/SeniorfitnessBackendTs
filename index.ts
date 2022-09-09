import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

// import router from './src/router/auth.router';
import {routes} from './src/router/auth.router';
import {eRouter} from './src/router/fitnessudstyr.router';
import {uRouter} from './src/router/user.router';
// import { createConnection } from 'net';

// createConnection


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', '*'],
  credentials: true,
}));
eRouter(app);
routes(app);
uRouter(app);
app.set("trust proxy", 1);


// app.use('/', router)

app.listen(8000, () => {
  console.log('listening to port 8000')
})
