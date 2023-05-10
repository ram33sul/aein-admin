import { postLoginService, verifyAdminService } from "../services/acountService.js"
import { controllerType } from "../types/type.js"

const TOKEN_NAME: string = process.env.TOKEN_NAME as string;

export const doLogin: controllerType = (req, res) => {
    try {
        postLoginService(req.body)
        .then(response => {
            res.cookie(TOKEN_NAME, response);
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(400).send(error);
        })
    } catch (error) {
        res.status(400).send(new Error("Internal error: doLogin"))
    }
}

export const doLogout: controllerType = (req, res) => {
    try {
        res.clearCookie(TOKEN_NAME);
        res.status(200).json(true)
    } catch (error) {
        res.status(400).send(new Error("Internal error: doLogout"));
    }
}

export const verifyAdmin: controllerType = (req,res) => {
    try {
        verifyAdminService(req.cookies[TOKEN_NAME])
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(400).send(new Error("Internal error: verifyAdmin"));
    }
}