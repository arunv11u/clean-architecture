import { AuthServiceImpl } from "../../auth";
import { UserServiceImpl } from "../../users";
import { AuthService, ServiceFactory, UserService } from "../types";

export class ServiceFactoryImpl implements ServiceFactory {

  constructor() { };

  getUserService(): UserService {
    return new UserServiceImpl();
  };

  getAuthService(): AuthService {
    return new AuthServiceImpl();
  };
};
