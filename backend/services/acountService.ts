import jwt from 'jsonwebtoken'
import { signToken, verifyToken } from '../authentication/jwt.js'

type postLoginServiceType = ({username, password}: {username: string, password: string}) => Promise<unknown>;

export const postLoginService: postLoginServiceType = ({username, password}) => {
    return new Promise((resolve, reject) => {
        if(!(username === 'admin' && password === 'admin')){
            return reject(false)
        }
        const token = signToken(username);
        return resolve(token);
    })
}

export const verifyAdmin = (token: string): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
        const isValid = await verifyToken(token);
        if(!isValid){
            return reject(false)
        }
        resolve(isValid);
    })
}