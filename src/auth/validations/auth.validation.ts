import { Response, NextFunction, RequestHandler } from "express";
import { AuthDTO, BaseAuthValidation, BaseDataTypeValidation, BaseObjectValidation, BaseResponseHandler, BaseStringHelper, BaseStringValidation, DataTypeValidation, GenericError, ObjectValidation, ResponseHandler, StringHelper, StringValidation, TypedRequest } from "../../utils";

export class AuthValidation implements BaseAuthValidation {
  private static _instance: BaseAuthValidation;
  
  private _responseHandler: BaseResponseHandler;
  private _objectValidation: BaseObjectValidation;
  private _stringValidation: BaseStringValidation;
  private _stringHelper: BaseStringHelper;
  private _dataTypeValidation: BaseDataTypeValidation;


  private constructor() { 
    this._responseHandler = ResponseHandler.getInstance();
    this._objectValidation = ObjectValidation.getInstance();
    this._stringValidation = StringValidation.getInstance();
    this._stringHelper = StringHelper.getInstance();
    this._dataTypeValidation = DataTypeValidation.getInstance();
  }

  static getInstance(): BaseAuthValidation {
    if (!AuthValidation._instance)
      AuthValidation._instance = new AuthValidation();

    return AuthValidation._instance;
  }

  private _guestLogin(request: TypedRequest<{}, {}, AuthDTO.GuestLogin>, response: Response<any, Record<string, any>>, next: NextFunction): void {
    const allowedFields: string[] = ["name", "email", "mobileNumber"];
    const requiredFields: string[] = ["name"];
    const nameMinLen = 1;
    const nameMaxLen = 50;
    const emailMinLen = 5;
    const emailMaxLen = 50;
    const mobileNumberMinLen = 8;
    const mobileNumberMaxLen = 16;

    const hasValidFields = this._objectValidation.allowFields(request.body, allowedFields);
    if (!hasValidFields.isValid) throw this._responseHandler.clientError(hasValidFields.message);

    for(let field of requiredFields) {
      const fieldName = this._stringHelper.camelToTitleCase(field);
      const isFieldExist = this._objectValidation.checkFieldExist(request.body, field);
      
      if (!isFieldExist) throw this._responseHandler.clientError(`${fieldName} is required`);
    };

    const name = request.body.name;
    if (name === "" || !this._stringValidation.checkStrMinLen(name, nameMinLen)) throw this._responseHandler.clientError(`Name should be minimum ${nameMinLen} character`);
    if (!this._stringValidation.checkStrMaxLen(name, nameMaxLen)) throw this._responseHandler.clientError(`Name should not exceeds ${nameMaxLen} characters`);

    const email = request.body.email;
    if (email && !this._dataTypeValidation.checkFieldIsString(email)) throw this._responseHandler.clientError("Email Address must be a string");
    if (email && !this._stringValidation.checkStrMinLen(email, emailMinLen)) throw this._responseHandler.clientError(`Email Address should be minimum ${emailMinLen} characters`);
    if (email && !this._stringValidation.checkStrMaxLen(email, emailMaxLen)) throw this._responseHandler.clientError(`Email Address should not exceeds ${emailMaxLen} characters`);
    if (email && !this._stringValidation.checkValidEmail(email)) throw this._responseHandler.clientError(`Email Address is invalid`);

    const mobileNumber = request.body.mobileNumber;
    if (mobileNumber && !this._dataTypeValidation.checkFieldIsString(mobileNumber)) throw this._responseHandler.clientError("Mobile Number must be a string");
    if (mobileNumber && !this._stringValidation.checkStrMinLen(mobileNumber, mobileNumberMinLen)) throw this._responseHandler.clientError(`Mobile Number should be minimum ${mobileNumberMinLen} characters`);
    if (mobileNumber && !this._stringValidation.checkStrMaxLen(mobileNumber, mobileNumberMaxLen)) throw this._responseHandler.clientError(`Mobile Number should not exceeds ${mobileNumberMaxLen} characters`);
    // E.164 Mobile Number standard
    if (mobileNumber && !this._stringValidation.checkRegexMatch(mobileNumber, new RegExp(/^\+[1-9]{1}[0-9]{3,14}$/))) throw this._responseHandler.clientError("Mobile Number is invalid");

    next();
  };

  guestLogin(): RequestHandler {
    return this._guestLogin.bind(this);
  };

}
