import { ClientSession, Types } from "mongoose";
import { getUserFactory, getTokenFactory } from "../../global-config";
import { AuthRepository, CreateTokenInput, GuestLoginInput, TokenDAO, UserDAO } from "../../utils";


export class AuthRepositoryImpl implements AuthRepository {
    private _userDAO: UserDAO;
    private _tokenDAO: TokenDAO;

    constructor() {
        this._userDAO = getUserFactory().getDAO();
        this._tokenDAO = getTokenFactory().getDAO();
    };

    async guestLogin(data: GuestLoginInput, session?: ClientSession): Promise<void> {
        const user = await this._userDAO.save(data.user, session);

        const tokenData: CreateTokenInput & { user: Types.ObjectId | string } = {
            ...data.token,
            user: user.id
        };
        await this._tokenDAO.save(tokenData, session);
    };
};
