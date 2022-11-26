import { Response, NextFunction } from "express";
import {
  Controller,
  Use,
  Post,
  TypedRequest,
} from "../../utils";

@Controller("/user")
class UserController {

  @Post("/")
  @Use((
    request: TypedRequest<{}, {}, {}>,
    response: Response,
    next: NextFunction) => { next(); })
  findById(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): void { }

};
