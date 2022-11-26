import { NCONF, Config, UserService } from "../../utils";


export class UserServiceImpl implements UserService {

    private _nconf: NCONF;

    constructor() {
        this._nconf = Config.getInstance().nconf;
    };


};
