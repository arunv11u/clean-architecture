import { UserDAOMongooseImpl } from "../../users";
import { DAOFactory, UserDAO } from "../types";



export class DAOFactoryImpl implements DAOFactory {

    constructor() { };

    getUserDAO(): UserDAO {
        return new UserDAOMongooseImpl();
    };

};
