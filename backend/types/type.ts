import { Request, Response, NextFunction } from "express";
import Ws from 'ws'
export type moodType = {
    name: string,
    color: string
}

export type keyable = {
    [key: string]: any;
}


export type controllerType = (req: Request, res: Response, next: NextFunction) => void;