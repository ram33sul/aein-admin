import { verifyToken } from "./jwt.js";
const auth = (req, res, next) => {
    const token = req.cookies['aein-admin-token'];
    verifyToken(token).then((response) => {
        next();
    }).catch(() => {
        return res.send(new Error("token is not valid"));
    });
};
export default auth;
