import mongoose, { Types } from 'mongoose';
import { MongooseHelper } from '../types';

export class MongooseHelperImpl implements MongooseHelper {

    constructor() { };

    getObjectId(id?: string | Types.ObjectId): Types.ObjectId {
        return new mongoose.Types.ObjectId(id);
    };
}; 
