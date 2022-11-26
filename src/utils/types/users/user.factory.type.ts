import { UserDAO } from "./user.dao.type";
import { UserPipe } from "./user.pipe.type";
import { UserService } from "./user.service.type";
import { UserValidation } from "./user.validation.type";


export interface UserFactory {
    getValidation(): UserValidation;
    getPipe(): UserPipe;
    getService(): UserService;
    getDAO(): UserDAO;
};
