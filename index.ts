import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
import cookieParser from "cookie-parser";
import cors from 'cors';

// import router from './src/router/auth.router';
import {routes} from './src/router/auth.router';
// import { createConnection } from 'net';

// createConnection


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', '*'],
  credentials: true
}));

routes(app);

// app.use('/', router)

app.listen(8000, () => {
  console.log('listening to port 8000')
})
