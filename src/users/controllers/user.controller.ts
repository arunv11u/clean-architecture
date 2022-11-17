import { Response, NextFunction } from "express";
import { BaseUserController, BaseServiceFactory, BaseResponse, Controller, ServiceFactory, Use, Post, ValidationFactory, BaseValidationFactory, BasePipeFactory, PipeFactory } from "../../utils";

const validationFactory: BaseValidationFactory = ValidationFactory.getInstance();
const pipeFactory: BasePipeFactory = PipeFactory.getInstance();
const serviceFactory: BaseServiceFactory = ServiceFactory.getInstance();


@Controller("/user")
class UserController implements BaseUserController {


};

export {
    UserController
};