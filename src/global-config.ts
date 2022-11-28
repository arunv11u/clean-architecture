import { AuthFactoryImpl } from "./auth";
import { TokenFactoryImpl } from "./tokens";
import { UserFactoryImpl } from "./users";


const authFactory = new AuthFactoryImpl();
const userFactory = new UserFactoryImpl();
const tokenFactory = new TokenFactoryImpl();


export {
    authFactory,
    userFactory,
    tokenFactory
};
