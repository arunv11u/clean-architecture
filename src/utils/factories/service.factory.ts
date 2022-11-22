import { AuthService } from "../../auth";
import { UserService } from "../../users";
import { BaseUserService, BaseServiceFactory, BaseAuthService } from "../types";

class ServiceFactory implements BaseServiceFactory {
  private static _instance: BaseServiceFactory;

  private constructor() {}

  static getInstance(): BaseServiceFactory {
    if (!ServiceFactory._instance)
      ServiceFactory._instance = new ServiceFactory();

    return ServiceFactory._instance;
  }

  getUserService(): BaseUserService {
    return UserService.getInstance();
  }

  getAuthService(): BaseAuthService {
    return AuthService.getInstance();
  }
}

export { ServiceFactory };
