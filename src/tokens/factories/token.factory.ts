import { TokenDAO, TokenFactory, TokenService } from "../../utils";
import { TokenDAOMongooseImpl } from "../daos/token.dao";
import { TokenServiceImpl } from "../services/token.service";



export class TokenFactoryImpl implements TokenFactory {

    constructor() { };

    getDAO(): TokenDAO {
        return new TokenDAOMongooseImpl();
    };

    getService(): TokenService {
        return new TokenServiceImpl();
    };
};
