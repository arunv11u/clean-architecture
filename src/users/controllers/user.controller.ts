import { Response, NextFunction } from "express";
import {
  BaseUserController,
  BaseServiceFactory,
  BaseResponse,
  Controller,
  ServiceFactory,
  Use,
  Post,
  ValidationFactory,
  BaseValidationFactory,
  BasePipeFactory,
  PipeFactory,
  TypedRequest,
  UserDTO,
} from "../../utils";

const validationFactory: BaseValidationFactory =
  ValidationFactory.getInstance();
const pipeFactory: BasePipeFactory = PipeFactory.getInstance();
const serviceFactory: BaseServiceFactory = ServiceFactory.getInstance();

@Controller("/user")
class UserController implements BaseUserController {
  @Post("/")
  @Use(
    (
      request: TypedRequest<{}, {}, {}>,
      response: Response,
      next: NextFunction
    ) => {
      next();
    }
  )
  sample(
    request: TypedRequest<{}, {}, {}>,
    response: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {}
}

export { UserController };
