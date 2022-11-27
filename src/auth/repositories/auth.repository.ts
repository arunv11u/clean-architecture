import { AuthRepository, GuestLoginInput, UserDAO } from "../../utils";
import { UserDAOMongooseImpl } from "../../users/daos/user.dao";


export class AuthRepoMongooseImpl implements AuthRepository {
    private userDAO: UserDAO;

    constructor() {
        this.userDAO = new UserDAOMongooseImpl();
    };

    async guestLogin(data: GuestLoginInput): Promise<void> {
        await this.userDAO.save(data.user);
    };
};
