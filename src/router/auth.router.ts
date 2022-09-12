import {Router} from 'express';
import { authenticatedUser, login, logout, refresh, register, deleteAllTokens, newLogin } from '../controller/auth.controller';

export const routes = (router: Router) => {
    router.post('/login', newLogin);
    router.post('/register', register);
    router.get('/user', authenticatedUser);
    router.post('/logout', logout);
    router.post('/refresh', refresh)
    router.get('/del', deleteAllTokens)
};

