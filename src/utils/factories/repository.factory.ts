import { AuthRepoMongooseImpl } from "../../auth";
import { AuthRepository, RepositoryFactory } from "../types";


export class RepositoryFactoryImpl implements RepositoryFactory {

    constructor() { };

    getAuthRepository(): AuthRepository {
        return new AuthRepoMongooseImpl();
    };

};
