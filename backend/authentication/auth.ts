import { NextFunction, Request, Response } from "express"
import { verifyToken } from "./jwt.js";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['aein-admin-token'];
    verifyToken(token).then((response) => {
        next()
    }).catch(() => {
        return res.send(new Error("token is not valid"))
    });
}
export default auth;