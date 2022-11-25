import { Mongoose } from 'mongoose';
import { GenericError } from './errors';
import { DbConnect } from './types';


export class MongooseConnect extends DbConnect {
    private static _instance: MongooseConnect;
    private isRequired: boolean = false;
    private _mongoose: Mongoose | null = null;
    private _dbConnectionString: string | null = null;

    private constructor() {
        super();
    };

    static getInstance(): MongooseConnect {
        if (!MongooseConnect._instance) MongooseConnect._instance = new MongooseConnect();

        return MongooseConnect._instance;
    };

    get mongoose() {
        if (!this.isRequired || !this._mongoose) throw new GenericError({ error: new Error(`Cannot get mongoose without setting it up`), errorCode: 500 });

        return this._mongoose;
    };

    set mongoose(mongoose: Mongoose) {
        if (!(mongoose instanceof Mongoose)) throw new GenericError({ error: new Error(`Expected mongoose object, but got ${typeof mongoose}`), errorCode: 500 });

        this._mongoose = mongoose;
    };

    get dbConnectionString() {
        if (!this._dbConnectionString)
            throw new GenericError({ error: new Error(`Must set the db connection string before trying to get it`), errorCode: 500 });

        return this._dbConnectionString;
    };

    set dbConnectionString(connectionStr: string) {
        if (!connectionStr || typeof connectionStr !== "string") throw new GenericError({ error: new Error(`Expected string, but got ${typeof connectionStr}`), errorCode: 500 });
        if (!this._dbConnectionString) this._dbConnectionString = connectionStr;

        else throw new GenericError({ error: new Error('_dbConnectionString cannot be changed once you set it'), errorCode: 500 });
    };

    async connect() {
        try {
            this.isRequired = true;
            if (!this._mongoose) throw new GenericError({ error: new Error('Must set mongoose before trying to connect'), errorCode: 500 });
            if (!this._dbConnectionString) throw new GenericError({ error: new Error(`Must set the db connection string and mongoose before trying to connect`), errorCode: 500 });

            try {
                await this._mongoose.connect(this._dbConnectionString);
            } catch (error) {
                throw new GenericError({ error: new Error(`Db connection failed`), errorCode: 500 });
            };

            return true;
        } catch (error) {
            throw (error);
        };
    };
};