import { Request, Response } from "express";

export type moodType = {
    name: string,
    color: string
}

export type keyable = {
    [key: string]: any;
}

export type controllerType = (req: Request, res: Response) => void;