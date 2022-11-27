import { TokenDAOMongooseImpl } from "../../tokens/daos/token.dao";
import { UserDAOMongooseImpl } from "../../users/daos/user.dao";
import { AuthRepository, GuestLoginInput, TokenDAO, UserDAO } from "../../utils";


export class AuthRepositoryImpl implements AuthRepository {
    private _userDAO: UserDAO;
    private _tokenDAO: TokenDAO;

    constructor() {
        this._userDAO = new UserDAOMongooseImpl();
        this._tokenDAO = new TokenDAOMongooseImpl();
    };

    async guestLogin(data: GuestLoginInput): Promise<void> {
        await this._userDAO.save(data.user);

        await this._tokenDAO.save(data.token);
    };
};
