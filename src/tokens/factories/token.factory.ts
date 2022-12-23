import { TokenDAO, TokenFactory, TokenService } from "../../utils";
import { TokenDAOImpl } from "../daos/token.dao";
import { TokenServiceImpl } from "../services/token.service";



export class TokenFactoryImpl implements TokenFactory {

    private _tokenDAO: TokenDAO;
    private _tokenService: TokenService;

    constructor() {
        this._tokenDAO = new TokenDAOImpl();
        this._tokenService = new TokenServiceImpl();
    };

    getDAO(): TokenDAO {
        return this._tokenDAO;
    };

    getService(): TokenService {
        return this._tokenService;
    };
};

