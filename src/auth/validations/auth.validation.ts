import { Response, NextFunction, RequestHandler } from "express";
import { BaseAuthValidation, BaseObjectValidation, GenericError, ObjectValidation, TypedRequest } from "../../utils";

export class AuthValidation implements BaseAuthValidation {
  private static _instance: BaseAuthValidation;
  
  private objectValidation: BaseObjectValidation = ObjectValidation.getInstance();


  private constructor() { }

  static getInstance(): BaseAuthValidation {
    if (!AuthValidation._instance)
      AuthValidation._instance = new AuthValidation();

    return AuthValidation._instance;
  }

  private _guestLogin(request: TypedRequest<{}, {}, {}>, response: Response<any, Record<string, any>>, next: NextFunction): void {
    const allowedFields: string[] = ["name", "email", "mobileNumber"];
    const hasValidFields = this.objectValidation.allowFields(request.body, allowedFields);
    if (!hasValidFields) throw new GenericError({error: new Error("Bad Request"), errorCode: 400});

    next();
  };

  guestLogin(): RequestHandler {
    return this._guestLogin.bind(this);
  };

}
