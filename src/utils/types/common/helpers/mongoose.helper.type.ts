import { ClientSession } from "mongoose";


export interface MongooseSessionHelper {
    start(): Promise<ClientSession>;
    commit(session: ClientSession): Promise<void>;
    abort(session: ClientSession): Promise<void>;
};
