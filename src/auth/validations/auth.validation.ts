import { Response, NextFunction, RequestHandler } from "express";
import { AuthDTO, AuthValidation, DataTypeValidation, DataTypeValidationImpl, ObjectValidation, ObjectValidationImpl, ResponseHandler, ResponseHandlerImpl, StringHelper, StringHelperImpl, StringValidation, StringValidationImpl, TypedRequest } from "../../utils";

export class AuthValidationImpl implements AuthValidation {

  private _responseHandler: ResponseHandler;
  private _objectValidation: ObjectValidation;
  private _stringValidation: StringValidation;
  private _stringHelper: StringHelper;
  private _dataTypeValidation: DataTypeValidation;


  constructor() {
    this._responseHandler = new ResponseHandlerImpl();
    this._objectValidation = new ObjectValidationImpl();
    this._stringValidation = new StringValidationImpl();
    this._stringHelper = new StringHelperImpl();
    this._dataTypeValidation = new DataTypeValidationImpl();
  };

  private _guestLogin(request: TypedRequest<{}, {}, AuthDTO.GuestLogin>, response: Response<any, Record<string, any>>, next: NextFunction): void {
    const allowedFields: string[] = ["name", "email", "phone"];
    const requiredFields: string[] = ["name"];
    const nameMinLen = 1;
    const nameMaxLen = 50;
    const emailMinLen = 5;
    const emailMaxLen = 50;
    const mobileNumberMinLen = 8;
    const mobileNumberMaxLen = 16;

    
    const hasValidFields = this._objectValidation.allowFields(request.body, allowedFields);
    if (!hasValidFields.isValid) throw this._responseHandler.clientError(hasValidFields.message);

    for (let field of requiredFields) {
      const fieldName = this._stringHelper.camelToTitleCase(field);
      const isFieldExist = this._objectValidation.checkFieldExist(request.body, field);

      if (!isFieldExist) throw this._responseHandler.clientError(`${fieldName} is required`);
    };

    const name = request.body.name;
    if (name === "" || !this._stringValidation.checkStrMinLen(name, nameMinLen)) throw this._responseHandler.clientError(`Name should be minimum ${nameMinLen} character`);
    if (!this._stringValidation.checkStrMaxLen(name, nameMaxLen)) throw this._responseHandler.clientError(`Name should not exceeds ${nameMaxLen} characters`);

    const email = request.body.email;
    const isEmailExist = this._objectValidation.checkFieldExist(request.body, "email");
    if (isEmailExist) {
      if (email && !this._dataTypeValidation.checkFieldIsString(email)) throw this._responseHandler.clientError("Email Address must be a string");
      if (email && !this._stringValidation.checkStrMinLen(email, emailMinLen)) throw this._responseHandler.clientError(`Email Address should be minimum ${emailMinLen} characters`);
      if (email && !this._stringValidation.checkStrMaxLen(email, emailMaxLen)) throw this._responseHandler.clientError(`Email Address should not exceeds ${emailMaxLen} characters`);
      if (email && !this._stringValidation.checkValidEmail(email)) throw this._responseHandler.clientError(`Email Address is invalid`);
    };

    const phone = request.body.phone;
    const isPhoneExist = this._objectValidation.checkFieldExist(request.body, "phone");
    if (isPhoneExist) {
      const allowedPhoneFields: string[] = ["code", "number"];
      const requiredPhoneFields: string[] = ["code", "number"];
      
      if (!this._dataTypeValidation.checkFieldIsObject(phone)) throw this._responseHandler.clientError(`Phone field must be an object`);

      const hasValidPhoneFields = this._objectValidation.allowFields(request.body.phone, allowedPhoneFields);
      if (!hasValidPhoneFields.isValid) throw this._responseHandler.clientError(`phone.${hasValidPhoneFields.message}`);

      for (let field of requiredPhoneFields) {
        const isPhoneFieldExist = this._objectValidation.checkFieldExist(request.body.phone, field);

        if (!isPhoneFieldExist) throw this._responseHandler.clientError(`phone.${field} is required`);
      };

      if (!this._dataTypeValidation.checkFieldIsString(phone.code)) throw this._responseHandler.clientError(`phone.code must be a string`);
      if (!this._dataTypeValidation.checkFieldIsString(phone.number)) throw this._responseHandler.clientError(`phone.number must be a string`);

      const mobileNumber = `${phone.code}${phone.number}`;
      if (!this._stringValidation.checkStrMinLen(mobileNumber, mobileNumberMinLen)) throw this._responseHandler.clientError(`Mobile Number should be minimum ${mobileNumberMinLen} characters`);
      if (!this._stringValidation.checkStrMaxLen(mobileNumber, mobileNumberMaxLen)) throw this._responseHandler.clientError(`Mobile Number should not exceeds ${mobileNumberMaxLen} characters`);
      // E.164 Mobile Number standard
      if (!this._stringValidation.checkRegexMatch(mobileNumber, new RegExp(/^\+[1-9]{1}[0-9]{3,14}$/))) throw this._responseHandler.clientError("Mobile Number is invalid");
    };


    next();
  };

  guestLogin(): RequestHandler {
    return this._guestLogin.bind(this);
  };

}
