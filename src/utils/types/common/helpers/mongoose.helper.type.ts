import { Types } from "mongoose";

export interface MongooseHelper {
    getObjectId(id?: string | Types.ObjectId): Types.ObjectId;
};
