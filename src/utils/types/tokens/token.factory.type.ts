import { TokenDAO } from "./token.dao.type";
import { TokenService } from "./token.service.type";


export interface TokenFactory {
    getDAO(): TokenDAO;
    getService(): TokenService;
};
