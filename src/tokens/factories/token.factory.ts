import { TokenDAO, TokenFactory, TokenService } from "../../utils";
import { TokenDAOMongooseImpl } from "../daos/token.dao";
import { TokenServiceImpl } from "../services/token.service";



export class TokenFactoryImpl implements TokenFactory {

    private _tokenDAO: TokenDAO;
    private _tokenService: TokenService;

    constructor() {
        this._tokenDAO = new TokenDAOMongooseImpl();
        this._tokenService = new TokenServiceImpl();
    };

    getDAO(): TokenDAO {
        return this._tokenDAO;
    };

    getService(): TokenService {
        return this._tokenService;
    };
};

