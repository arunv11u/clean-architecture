import { AuthRepository } from "../../auth";
import { BaseAuthRepository, BaseRepositoryFactory } from "../types";


class RepositoryFactory implements BaseRepositoryFactory {

    private static _instance: BaseRepositoryFactory;

    private constructor() { };

    static getInstance(): BaseRepositoryFactory {
        if (!RepositoryFactory._instance) RepositoryFactory._instance = new RepositoryFactory();

        return RepositoryFactory._instance;
    };

    getAuthRepository(): BaseAuthRepository {
        return AuthRepository.getInstance();
    };

};

export {
    RepositoryFactory
};
