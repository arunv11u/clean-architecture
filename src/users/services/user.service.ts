import { UserService, UserDAO, IdGeneratorHelper, IdGeneratorHelperImpl } from "../../utils";
import { UserDAOMongooseImpl } from "../daos/user.dao";


export class UserServiceImpl implements UserService {

    private _userDAO: UserDAO;
    private _idGeneratorHelper: IdGeneratorHelper;

    constructor() {
        this._userDAO = new UserDAOMongooseImpl();
        this._idGeneratorHelper = new IdGeneratorHelperImpl();
    };

    async generateUserId(): Promise<string> {
        let userId: string | undefined;
        let runLoop: boolean = true;

        while (runLoop) {
            const uid = await this._idGeneratorHelper.short8();

            const isUserIdExists = await this._userDAO.checkUserExists(uid);

            if (!isUserIdExists) {
                userId = uid;
                runLoop = false;
            };
        };

        return userId as string;
    };

};
