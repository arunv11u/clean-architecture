import { AuthFactoryImpl } from "./auth";
import { UserFactoryImpl } from "./users";


const authFactory = new AuthFactoryImpl();
const userFactory = new UserFactoryImpl();


export {
    authFactory,
    userFactory,
};
