import mongoose from 'mongoose';
import { DatabaseConnectionError, GenericError } from './errors';
import { DbConnect } from './types';

console.log("MongooseConnectSingleton file loaded ::");

class MongooseConnect implements DbConnect {

    constructor() { };

    async connect(connectionStr: string) {
        try {
            if (!connectionStr) throw new GenericError({ error: new Error(`Db connection string is required to connect to the database`), errorCode: 500 });

            try {
                await mongoose.connect(connectionStr);
            } catch (error) {
                throw new DatabaseConnectionError();
            };

            return true;
        } catch (error) {
            throw (error);
        };
    };
};


export {
    MongooseConnect
};
