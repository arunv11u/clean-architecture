import { ClientSession } from "mongoose";
import { getUserFactory, getTokenFactory } from "../../global-config";
import { AuthRepository, GuestLoginInput, TokenDAO, UserDAO } from "../../utils";


export class AuthRepositoryImpl implements AuthRepository {
    private _userDAO: UserDAO;

    constructor() {
        this._userDAO = getUserFactory().getDAO();
    };

    async guestLogin(data: GuestLoginInput, session?: ClientSession): Promise<void> {
        await this._userDAO.save(data.user, session);
    };
};
