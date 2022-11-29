import { ClientSession } from "mongoose";
import { tokenFactory, userFactory } from "../../global-config";
import { AuthRepository, GuestLoginInput, TokenDAO, UserDAO } from "../../utils";


export class AuthRepositoryImpl implements AuthRepository {
    private _userDAO: UserDAO;
    private _tokenDAO: TokenDAO;

    constructor() {
        this._userDAO = userFactory.getDAO();
        this._tokenDAO = tokenFactory.getDAO();
    };

    async guestLogin(data: GuestLoginInput, session?: ClientSession): Promise<void> {
        await this._userDAO.save(data.user, session);

        await this._tokenDAO.save(data.token, session);
    };
};
