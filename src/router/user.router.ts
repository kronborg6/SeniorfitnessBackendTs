import {Router} from 'express';
import { allUser } from '../controller/user.controller';

export const uRouter = (router: Router) => {
    router.get('/alluser', allUser);
}