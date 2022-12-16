import { SessionData, Store } from "express-session";
import { GenericError } from "../errors";
import { MongooseServiceImpl } from "../services";
import { DatabaseService } from "../types";
import { Session, SessionDoc } from "./models/session.model";


interface StoreSession extends Store {
    get(sid: string, callback: (err?: Error, session?: SessionData | null | undefined) => void): void;
    set(sid: string, sessionData: SessionData, callback: ((err?: Error) => void)): void;
    destroy(sid: string, callback: ((err?: Error) => void)): void;
    delete(sid: string): Promise<void>;
};

export class StoreSessionImpl extends Store implements StoreSession {

    private _mongooseService: DatabaseService;

    constructor() {
        super();

        this._mongooseService = new MongooseServiceImpl();
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
        sessionData = JSON.parse(JSON.stringify(sessionData));
        this._mongooseService.findOneAndUpdate(Session, { _id: sid }, { $set: { data: sessionData }, $setOnInsert: { creationDate: new Date(), lastModifiedDate: new Date() } }, { new: true, upsert: true }).then(() => {
            callback(undefined);
        }).catch(err => {
            console.log("error in set ::", err);
            callback(err);
        });
    };

    destroy(sid: string, callback: ((err?: Error) => void)): void {
        console.log("StoreSession destroy called :");

        this._mongooseService.findOneAndDelete(Session, { _id: sid }, { new: true }).then(() => {
            callback(undefined);
        }).catch(err => {
            callback(err);
        });
    };

    async delete(sid: string): Promise<void> {
        const session = await this._mongooseService.findOneAndUpdate(Session, { _id: sid }, { $set: { isDeleted: true } }, { new: true });

        if (!session) throw new GenericError({ error: new Error("Session not found"), errorCode: 404 });
    };
};
