import { AuthFactoryImpl } from "./auth";
import { UserFactoryImpl } from "./users";
import { ResponseHandlerImpl } from "./utils";


const authFactory = new AuthFactoryImpl();
const userFactory = new UserFactoryImpl();

const responseHandler = new ResponseHandlerImpl();

export {
    authFactory,
    userFactory,
    responseHandler
};
