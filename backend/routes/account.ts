import express, { Router } from 'express';
import { doLogin, doLogout, verifyAdmin } from '../controllers/accountController.js';
import auth from '../authentication/auth.js';
import { addMood, connectToMessages, messagesEvent, postsCountDetails, postsData, postsInteractionsCount, userDetails, usersCountDetails, usersData } from '../controllers/fetchController.js';

const router: Router = express.Router();

router.post('/login', doLogin);

router.get('/logout', doLogout);

router.get('/verifyAdmin', verifyAdmin);

router.use(auth);

router.get('/postsCount', postsCountDetails);

router.get('/usersCount', usersCountDetails);

router.get('/postsInteractionsCount', postsInteractionsCount);

router.get('/postsData', postsData);

router.get('/usersData', usersData);

router.get('/userDetails', userDetails)

router.use(connectToMessages);

router.get('/messagesCount', messagesEvent("messagesCountDetails"));

router.get('/moodsDetails', messagesEvent("moodsDetails"));

router.get('/moodDetails', messagesEvent("moodDetails"));

router.patch('/removeMood', messagesEvent("removeMood"));

router.patch('/recallMood', messagesEvent("recallMood"));

router.patch('/editMood', messagesEvent("editMood"));

router.post('/addMood', addMood);


export default router;