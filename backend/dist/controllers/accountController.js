import { postLoginService, verifyAdminService } from "../services/acountService.js";
const TOKEN_NAME = process.env.TOKEN_NAME;
export const doLogin = (req, res) => {
    try {
        postLoginService(req.body)
            .then(response => {
            res.cookie(TOKEN_NAME, response);
            res.status(200).json(response);
        })
            .catch(error => {
            res.status(400).send(error);
        });
    }
    catch (error) {
        res.status(400).send(new Error("Internal error: doLogin"));
    }
};
export const doLogout = (req, res) => {
    try {
        res.clearCookie(TOKEN_NAME);
        res.status(200).json(true);
    }
    catch (error) {
        res.status(400).send(new Error("Internal error: doLogout"));
    }
};
export const verifyAdmin = (req, res) => {
    try {
        verifyAdminService(req.cookies[TOKEN_NAME])
            .then(response => {
            res.status(200).json(response);
        })
            .catch(error => {
            res.status(400).send(error);
        });
    }
    catch (error) {
        res.status(400).send(new Error("Internal error: verifyAdmin"));
    }
};
