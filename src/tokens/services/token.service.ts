import { TokenPayload, TokenService } from "../../utils";


export class TokenServiceImpl implements TokenService {

    constructor() { };

    async get(payload: TokenPayload): Promise<string> {

        return "";
    };
};
