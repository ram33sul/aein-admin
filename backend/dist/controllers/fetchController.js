import axios from "axios";
import Ws from 'ws';
const USER_SERVICE = process.env.USER_SERVICE;
const GATEWAY_SERVICE = process.env.GATEWAY_SERVICE;
const POST_SERVICE = process.env.POST_SERVICE;
const MESSAGE_SERVICE = process.env.MESSAGE_SERVICE;
const TOKEN_NAME = process.env.TOKEN_NAME;
export const postsCountDetails = (req, res) => {
    axios.get(`${POST_SERVICE}/postsCount?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json({ totalPosts: response.data[0].value, totalPostsToday: response.data[1].value });
    }).catch((error) => {
        console.log(error);
        res.status(400).send("Can't fetch postsCountDetails!");
    });
};
export const usersCountDetails = (req, res) => {
    axios.get(`${USER_SERVICE}/totalUsersCount?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json({ totalUsers: response.data[0].value, totalUsersToday: response.data[1].value });
    }).catch((error) => {
        console.log(error);
        res.status(400).send("Can't fetch usersCountDetails!");
    });
};
export const messagesCountDetails = (req, res) => {
    let responseSent = false;
    const messageServer = new Ws(`${MESSAGE_SERVICE}?token=${req.cookies[TOKEN_NAME]}`);
    messageServer.on('open', () => {
        messageServer.send(JSON.stringify({
            type: 'messagesCountDetails',
            from: 'admin'
        }));
    });
    messageServer.on('message', (message) => {
        const { messageData, type } = JSON.parse(message.toString());
        if (type === 'messagesCountDetails') {
            if (!responseSent) {
                responseSent = true;
                res.status(200).json(messageData).end();
            }
        }
    });
    messageServer.on('close', (code, reason) => {
        if (!responseSent) {
            responseSent = true;
            res.status(400).send("WS closed unexpectedly!");
        }
    });
    messageServer.on('error', (error) => {
        if (!responseSent) {
            responseSent = true;
            res.status(400).send("error at WS connection!");
        }
    });
};
