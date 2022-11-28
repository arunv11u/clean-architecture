import { TokenDAO } from "./token.dao.type";


export interface TokenFactory {
    getDAO(): TokenDAO;
};
