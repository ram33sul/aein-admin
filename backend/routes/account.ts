import express, { Router } from 'express';
import { doLogin, doLogout } from '../controllers/accountController.js';
import auth from '../authentication/auth.js';

const router: Router = express.Router();

router.post('/login', doLogin);

router.post('/logout', doLogout);

router.use(auth);

export default router;