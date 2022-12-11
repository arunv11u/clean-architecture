import { AuthFactoryImpl } from "./auth";
import { TokenFactoryImpl } from "./tokens";
import { UserFactoryImpl } from "./users";

const defaultRoutePath = "/api";

const getAuthFactory = () => {
    return new AuthFactoryImpl();
};

const getUserFactory = () => {
    return new UserFactoryImpl();
};

const getTokenFactory = () => {
    return new TokenFactoryImpl();
};

export {
    defaultRoutePath,
    getAuthFactory,
    getUserFactory,
    getTokenFactory
};
