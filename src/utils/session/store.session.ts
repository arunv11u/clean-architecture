import { SessionData, Store } from "express-session";
import { MongooseServiceImpl } from "../services";
import { DatabaseService } from "../types";
import { Session, SessionDoc } from "./models/session.model";


export class StoreSession extends Store {

    private _mongooseService: DatabaseService;

    constructor() {
        super();

        this._mongooseService = new MongooseServiceImpl();
    };

    destroy(sid: string, callback: ((err?: Error) => void)): void {
        this._mongooseService.findOneAndDelete(Session, { _id: sid }, { new: true }).then(() => {
            callback(undefined);
        }).catch(err => {
            callback(err);
        });
    };

    get(sid: string, callback: (err?: Error, session?: SessionData | null | undefined) => void): void {
        this._mongooseService.findOne(Session, { _id: sid }).then(session => {
            const sessionObj = Session.jsonObj(session) as (SessionDoc | null);

            if (!sessionObj) return callback(undefined, null);

            callback(undefined, sessionObj.data as unknown as SessionData);
        }).catch(err => {
            callback(err);
        });
    };

    set(sid: string, sessionData: SessionData, callback: ((err?: Error) => void)): void {
        this._mongooseService.findOneAndUpdate(Session, { _id: sid }, { $set: { data: sessionData }, $setOnInsert: { creationDate: new Date(), lastModifiedDate: new Date() } }, { new: true, upsert: true }).then(() => {
            callback(undefined);
        }).catch(err => {
            callback(err);
        });
    };
};
