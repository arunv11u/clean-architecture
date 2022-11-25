import { AggregateOptions } from "mongodb";
import mongoose, { Model, QueryOptions, HydratedDocument, FilterQuery, PipelineStage, Document, Types, SaveOptions, InsertManyOptions, MergeType, Require_id, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import { UpdateResult } from 'mongodb';
import { MongooseConnect } from "../mongoose-connect";
import { BaseMongooseService } from "../types";

export class MongooseService implements BaseMongooseService {

    private static _instance: BaseMongooseService;

    private constructor() { };

    static getInstance(): BaseMongooseService {
        if (!MongooseService._instance) MongooseService._instance = new MongooseService();

        return MongooseService._instance;
    };

    private async _reconnectIfDisconnected(): Promise<void> {
        const mongooseConnect = MongooseConnect.getInstance();
        const dbConnectionString = mongooseConnect.dbConnectionString;

        if (mongoose.connection.readyState !== 1) await mongoose.connect(dbConnectionString);
    };

    async findById<DocType>(collRef: Model<DocType>, id: string, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        await this._reconnectIfDisconnected();

        const _query = collRef.findById(id, undefined, options);

        return _query;
    };

    async findOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        await this._reconnectIfDisconnected();

        const _query = collRef.findOne(query, undefined, options);

        return _query;
    };

    async find<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType>[]> {
        await this._reconnectIfDisconnected();

        const _query = collRef.find(query, undefined, options);

        return _query;
    };

    async aggregate<DocType>(collRef: Model<DocType>, pipeline?: PipelineStage[] | undefined, options?: AggregateOptions | undefined): Promise<any[]> {
        await this._reconnectIfDisconnected();

        const _query = collRef.aggregate(pipeline, options);

        return _query;
    };

    async countDocuments<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<number> {
        await this._reconnectIfDisconnected();

        const _query = collRef.countDocuments(query, options);

        return _query;
    };

    async save<DocType>(docRef: HydratedDocument<DocType>, options?: SaveOptions | undefined): Promise<DocType | (Document<unknown, any, DocType> & { _id?: unknown; } & Required<{ _id: unknown; }>)> {
        await this._reconnectIfDisconnected();

        return docRef.save(options);
    };

    async insertMany<DocType>(collRef: Model<DocType>, docs: DocType[], options: InsertManyOptions & { lean: true }): Promise<MergeType<MergeType<DocType, DocType>, Require_id<DocType>>[]> {
        await this._reconnectIfDisconnected();

        const _query = collRef.insertMany(docs, options);

        return _query;
    };

    async findByIdAndUpdate<DocType>(collRef: Model<DocType>, id: string, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        await this._reconnectIfDisconnected();

        const _query = collRef.findByIdAndUpdate(id, updateQuery, options);

        return await _query;
    };

    async findOneAndUpdate<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        await this._reconnectIfDisconnected();

        const _query = collRef.findOneAndUpdate(query, updateQuery, options);

        return await _query;
    };

    async updateOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult> {
        await this._reconnectIfDisconnected();

        const _query = collRef.updateOne(query, updateQuery, options);

        return await _query;
    };

    async updateMany<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult> {
        await this._reconnectIfDisconnected();

        const _query = collRef.updateMany(query, updateQuery, options);

        return await _query;
    };

    async findOneAndDelete<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        await this._reconnectIfDisconnected();

        const _query = collRef.findOneAndDelete(query, options);

        return await _query;
    };
};
