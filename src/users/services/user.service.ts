import { NCONF, config, UserService } from "../../utils";


export class UserServiceImpl implements UserService {

    private _nconf: NCONF;

    constructor() {
        this._nconf = config.nconf;
    };


};
