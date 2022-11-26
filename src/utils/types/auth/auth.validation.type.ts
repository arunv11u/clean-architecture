import { RequestHandler } from "express";

export interface AuthValidation {
  guestLogin(): RequestHandler;
};
