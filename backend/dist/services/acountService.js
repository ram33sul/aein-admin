var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { signToken, verifyToken } from '../authentication/jwt.js';
export const postLoginService = ({ username, password }) => {
    return new Promise((resolve, reject) => {
        if (username !== 'admin') {
            return reject([{ field: 'username', message: 'Username is invalid' }]);
        }
        if (password !== 'admin') {
            return reject([{ field: 'password', message: 'Password is incorrect' }]);
        }
        const token = signToken(username);
        return resolve(token);
    });
};
export const verifyAdminService = (token) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        verifyToken(token)
            .then((response) => {
            resolve(response);
        })
            .catch(() => {
            reject(false);
        });
    }));
};
