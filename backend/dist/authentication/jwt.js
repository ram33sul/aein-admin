import jwt from 'jsonwebtoken';
const TOKEN_KEY = process.env.TOKEN_KEY;
export const signToken = (id) => {
    return jwt.sign({
        id
    }, TOKEN_KEY, {
        expiresIn: '2h'
    });
};
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, TOKEN_KEY, (error, data) => {
            if (error) {
                return reject(false);
            }
            return resolve(data);
        });
    });
};
