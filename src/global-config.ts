import { AuthFactoryImpl } from "./auth";
import { TokenFactoryImpl } from "./tokens";
import { UserFactoryImpl } from "./users";

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
    getAuthFactory,
    getUserFactory,
    getTokenFactory
};
