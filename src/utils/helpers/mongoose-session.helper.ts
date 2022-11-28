import { ClientSession } from 'mongodb';
import mongoose from 'mongoose';
import { MongooseSessionHelper } from '../types';

export class MongooseSessionHelperImpl implements MongooseSessionHelper {

    constructor() { };

    async start(): Promise<ClientSession> {
        const session = await mongoose.startSession();
        session.startTransaction();

        return session;
    };

    async commit(session: ClientSession): Promise<void> {
        await session.commitTransaction();
        await session.endSession();
    };

    async abort(session: ClientSession): Promise<void> {
        await session.abortTransaction();
        await session.endSession();
    };

}; 
