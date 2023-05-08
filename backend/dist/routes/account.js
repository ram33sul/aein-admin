import express from 'express';
import { doLogin, doLogout } from '../controllers/accountController.js';
import auth from '../authentication/auth.js';
const router = express.Router();
router.post('/login', doLogin);
router.post('/logout', doLogout);
router.use(auth);
export default router;
