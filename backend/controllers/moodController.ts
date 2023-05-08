import { Request, Response } from "express";
import { controllerType } from "../types/type.js";
import { createMoodService } from "../services/moodService.js";

export const createMood: controllerType = (req, res) => {
    try {
        createMoodService(req.body).then((response) => {
            res.status(200).json(response)
        }).catch((error) => {
            res.status(400).send(error)
        })
    } catch (error) {
        res.status(400).send(new Error("Internal error: createMood"))
    }
}

