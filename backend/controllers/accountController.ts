import { postLoginService } from "../services/acountService.js"
import { controllerType } from "../types/type.js"
export const doLogin: controllerType = (req, res) => {
    try {
        postLoginService(req.body).then((response) => {
            res.cookie(process.env.TOKEN_NAME!, response);
            res.status(200).json(response);
        }).catch((error) => {
            res.status(400).send(error);
        })
    } catch (error) {
        res.status(400).send(new Error("Internal error: doLogin"))
    }
}

export const doLogout: controllerType = (req, res) => {
    try {
        res.clearCookie(process.env.TOKEN_NAME!);
        res.status(200).json(true)
    } catch (error) {
        res.status(400).send(new Error("Internal error: doLogout"));
    }
}