import jwt from 'jsonwebtoken'
import { signToken, verifyToken } from '../authentication/jwt.js'

type postLoginServiceType = ({username, password}: {username: string, password: string}) => Promise<unknown>;

export const postLoginService: postLoginServiceType = ({username, password}) => {
    return new Promise((resolve, reject) => {
        if(username !== 'admin'){
            return reject([{field: 'username', message: 'Username is invalid'}])
        }
        if(password !== 'admin'){
            return reject([{field: 'password', message: 'Password is incorrect'}])
        }
        const token = signToken(username);
        return resolve(token);
    })
}

export const verifyAdminService = (token: string): Promise<unknown> => {
    return new Promise(async (resolve, reject) => {
        verifyToken(token)
        .then((response) => {
            resolve(response)
        })
        .catch(() => {
            reject(false)
        });
    })
}
