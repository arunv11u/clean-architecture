import { UserDAO } from "../../users";
import { BaseDAOFactory, BaseUserDAO } from "../types";


class DAOFactory implements BaseDAOFactory {

    private static _instance: BaseDAOFactory;

    private constructor() { };

    static getInstance(): BaseDAOFactory {
        if (!DAOFactory._instance) DAOFactory._instance = new DAOFactory();

        return DAOFactory._instance;
    };

    getUserDAO(): BaseUserDAO {
        return UserDAO.getInstance();
    };

};

export {
    DAOFactory
};
