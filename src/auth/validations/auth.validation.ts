import { Response, NextFunction, RequestHandler } from "express";
import { BaseAuthValidation, BaseObjectValidation, BaseResponseHandler, GenericError, ObjectValidation, ResponseHandler, TypedRequest } from "../../utils";

export class AuthValidation implements BaseAuthValidation {
  private static _instance: BaseAuthValidation;
  
  private responseHandler: BaseResponseHandler;
  private objectValidation: BaseObjectValidation;


  private constructor() { 
    this.responseHandler = ResponseHandler.getInstance();
    this.objectValidation = ObjectValidation.getInstance();
  }

  static getInstance(): BaseAuthValidation {
    if (!AuthValidation._instance)
      AuthValidation._instance = new AuthValidation();

    return AuthValidation._instance;
  }

  private _guestLogin(request: TypedRequest<{}, {}, {}>, response: Response<any, Record<string, any>>, next: NextFunction): void {
    const allowedFields: string[] = ["name", "email", "mobileNumber"];
    const requiredFields: string[] = ["name"];

    const hasValidFields = this.objectValidation.allowFields(request.body, allowedFields);
    if (!hasValidFields.isValid) throw this.responseHandler.clientError(hasValidFields.message);

    for(let field of requiredFields) {
      const isFieldExist = this.objectValidation.checkFieldExist(request.body, field);
      console.log("isFieldExist ::", isFieldExist);
      if(!isFieldExist) throw this.responseHandler.clientError(`${field} is required`);
    };

    next();
  };

  guestLogin(): RequestHandler {
    return this._guestLogin.bind(this);
  };

}
