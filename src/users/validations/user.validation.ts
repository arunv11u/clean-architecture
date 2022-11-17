import Joi from 'joi';
import { RequestHandler } from "express";
import { BaseUserValidation } from "../../utils";

class UserValidation implements BaseUserValidation {

    private static _instance: BaseUserValidation;

    constructor() { };

    static getInstance(): BaseUserValidation {
        if (!UserValidation._instance) UserValidation._instance = new UserValidation();

        return UserValidation._instance;
    };


};

export {
    UserValidation
};