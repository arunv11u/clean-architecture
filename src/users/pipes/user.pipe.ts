import { Response, NextFunction } from "express";
import { BaseUserPipe, TypedMulterRequest } from "../../utils";


class UserPipe implements BaseUserPipe {

    private static _instance: BaseUserPipe;

    constructor() { };

    static getInstance(): BaseUserPipe {
        if (!UserPipe._instance) UserPipe._instance = new UserPipe();

        return UserPipe._instance;
    };


};

export {
    UserPipe
};