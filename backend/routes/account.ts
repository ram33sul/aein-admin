import express, { Router } from 'express';
import { doLogin, doLogout, verifyAdmin } from '../controllers/accountController.js';
import auth from '../authentication/auth.js';
import { addMood, connectToMessages, messagesCountDetails, postsCountDetails, usersCountDetails } from '../controllers/fetchController.js';

const router: Router = express.Router();

router.post('/login', doLogin);

router.get('/logout', doLogout);

router.get('/verifyAdmin', verifyAdmin);

router.use(auth);

router.get('/postsCount', postsCountDetails);

router.get('/usersCount', usersCountDetails);

router.use(connectToMessages);

router.get('/messagesCount', messagesCountDetails);

router.post('/addMood', addMood);


export default router;