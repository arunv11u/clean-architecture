import { TokenDAO, TokenFactory } from "../../utils";
import { TokenDAOMongooseImpl } from "../daos/token.dao";



export class TokenFactoryImpl implements TokenFactory {

    constructor() { };

    getDAO(): TokenDAO {
        return new TokenDAOMongooseImpl();
    };

};
