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
        if (!(username === 'admin' && password === 'admin')) {
            return reject(false);
        }
        const token = signToken(username);
        return resolve(token);
    });
};
export const verifyAdmin = (token) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const isValid = yield verifyToken(token);
        if (!isValid) {
            return reject(false);
        }
        resolve(isValid);
    }));
};
