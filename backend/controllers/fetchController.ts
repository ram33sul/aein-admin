import axios from "axios";
import { controllerType } from "../types/type.js";
import Ws from 'ws';
import { Request } from "express";

const USER_SERVICE = process.env.USER_SERVICE;
const POST_SERVICE = process.env.POST_SERVICE
const MESSAGE_SERVICE = process.env.MESSAGE_SERVICE;
const TOKEN_NAME = process.env.TOKEN_NAME as string;

export const postsCountDetails: controllerType = (req, res) => {
    axios.get(`${POST_SERVICE}/postsCount?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json({totalPosts: response.data[0].value, totalPostsToday: response.data[1].value});
    }).catch((error) => {        
        res.status(400).send("Can't fetch postsCountDetails!")
    })
}

export const postsInteractionsCount: controllerType = (req, res) => {
    axios.get(`${POST_SERVICE}/postsInteractionsCount?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json(response.data)
    }).catch(error => {
        res.status(400).send("Can't fetch postsInteractionsCount!")
    })
}

export const postsData: controllerType = (req, res) => {
    axios.get(`${POST_SERVICE}/postsData?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json(response.data)
    }).catch(error => {
        res.status(400).send("Can't fetch postsData!")
    })
}

export const postDetails: controllerType = (req, res) => {
    axios.get(`${POST_SERVICE}/postDetails?token=${req.cookies[TOKEN_NAME]}&id=${req.query.id}`).then((response) => {
        res.status(200).json(response.data)
    }).catch(error => {
        res.status(400).send("Can't fetch postsData!")
    })
}

export const postBlock: controllerType = (req, res) => {
    axios.get(`${POST_SERVICE}/postBlock?token=${req.cookies[TOKEN_NAME]}&id=${req.query.id}`).then((response) => {
        res.status(200).json(response.data)
    }).catch(error => {
        res.status(400).send("Can't fetch postsData!")
    })
}

export const postUnblock: controllerType = (req, res) => {
    axios.get(`${POST_SERVICE}/postUnblock?token=${req.cookies[TOKEN_NAME]}&id=${req.query.id}`).then((response) => {
        res.status(200).json(response.data)
    }).catch(error => {
        res.status(400).send("Can't fetch postsData!")
    })
}

export const usersCountDetails: controllerType = (req, res) => {
    axios.get(`${USER_SERVICE}/totalUsersCount?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json({totalUsers: response.data[0].value, totalUsersToday: response.data[1].value})
    }).catch((error) => {
        console.log(error);
        res.status(400).send("Can't fetch usersCountDetails!")
    })
}

export const usersData: controllerType = (req, res) => {
    axios.get(`${USER_SERVICE}/usersData?token=${req.cookies[TOKEN_NAME]}`).then((response) => {
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(400).send("Can't fetch usersData!")
    })
}

export const userDetails: controllerType = (req, res) => {
    axios.get(`${USER_SERVICE}/userDetails?token=${req.cookies[TOKEN_NAME]}&id=${req.query.id}`).then((response) => {
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(400).send("Can't fetch usersData!")
    })
}

export const blockUser: controllerType = (req, res) => {
    axios.get(`${USER_SERVICE}/blockUserAdmin?token=${req.cookies[TOKEN_NAME]}&id=${req.query.id}`).then((response) => {
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(400).send("Can't fetch usersData!")
    })
}

export const unblockUser: controllerType = (req, res) => {
    axios.get(`${USER_SERVICE}/unblockUserAdmin?token=${req.cookies[TOKEN_NAME]}&id=${req.query.id}`).then((response) => {
        res.status(200).json(response.data)
    }).catch((error) => {      
        console.log(error);
        res.status(400).send("Can't fetch usersData!");
    })
}

interface ModifiedRequest extends Request{
    messagesServer : Ws
}

export const connectToMessages: controllerType = (req, res, next) => {
    const messageServer = new Ws(`${MESSAGE_SERVICE}?token=${req.cookies[TOKEN_NAME]}`);
    (req as ModifiedRequest).messagesServer = messageServer;
    next();
}


export const messagesEvent = (event: string): controllerType => {
    return (req, res) => {
        let responseSent = false
        const messageServer = (req as ModifiedRequest).messagesServer;
        
        messageServer.on('open', () => {
            
            messageServer.send(JSON.stringify({
                type: event,
                messageData: {
                    ...req.query,
                    ...req.body
                },
                from: 'admin'
            }));
        });
        messageServer.on('message', (message: Ws.Data) => {
            const { messageData, type, error } = JSON.parse(message.toString());

            if(type === event){
                if(!responseSent){
                    responseSent = true;
                    if(error){                        
                        return res.status(400).send(error)
                    } else {    
                        return res.status(200).json(messageData).end();
                    }
                }
            }    
        })
        messageServer.on('close', (code: number, reason: string) => {
            if(!responseSent){
                responseSent = true;
                return res.status(400).send("WS closed unexpectedly!")
            }
        });
        messageServer.on('error', (error: Error) => {
            if(!responseSent){
                responseSent = true;
                return res.status(400).send("error at WS connection!")
            }
        });
    }
}

export const addMood: controllerType = (req, res) => {
    let responseSent = false
    const messageServer = (req as ModifiedRequest).messagesServer;
    
    const { name, color } = req.body;

    const error = []
    if(!name){
        error[error.length] = {field: 'name', message: 'Name is required!'}
    }
    if(!color){
        error[error.length] = {field: 'color', message: 'Color is required!'}
    }
    if(error.length){
        if(!responseSent){
            return res.status(400).send(error)
        }
    }
    messageServer.on('open', () => {
        messageServer.send(JSON.stringify({
            type: 'addMood',
            from: 'admin',
            messageData: {
                name,
                color
            }
        }));
    });
    messageServer.on('message', (message: Ws.Data) => {
        
        const { messageData, type, error } = JSON.parse(message.toString());
        if(type === 'addMood'){
            if(!responseSent){
                responseSent = true;
                if(error){
                    return res.status(400).send(error);
                }
                return res.status(200).json(messageData);
            }
        }    
    })
    messageServer.on('close', (code: number, reason: string) => {
        if(!responseSent){
            responseSent = true;
            return res.status(400).send("WS closed unexpectedly!")
        }
    });
    messageServer.on('error', (error: Error) => {
        
        if(!responseSent){
            responseSent = true;
            return res.status(400).send("error at WS connection!")
        }
    });
}