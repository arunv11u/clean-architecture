import { Mongoose } from "mongoose";

export abstract class DbConnect {
    abstract get mongoose(): Mongoose;
    abstract get dbConnectionString(): string;
    abstract set dbConnectionString(connectionStr: string);
    abstract set mongoose(mongoose: Mongoose);
    abstract connect(): Promise<boolean>;
};