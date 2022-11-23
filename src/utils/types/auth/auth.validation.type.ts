import { Request, Response, NextFunction, RequestHandler } from "express";

interface BaseAuthValidation {
  guestLogin(): RequestHandler;
}

export { BaseAuthValidation };
