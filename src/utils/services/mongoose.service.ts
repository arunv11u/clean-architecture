import { AggregateOptions } from "mongodb";
import mongoose, {
    Model,
    QueryOptions,
    HydratedDocument,
    FilterQuery,
    PipelineStage,
    Document,
    Types,
    SaveOptions,
    InsertManyOptions,
    MergeType,
    Require_id,
    UpdateQuery,
    UpdateWithAggregationPipeline
} from "mongoose";
import { UpdateResult } from 'mongodb';
import { DatabaseService } from "../types";
import { GenericError } from "../errors";
import nconf from 'nconf';

export class MongooseServiceImpl implements DatabaseService {

    constructor() { };

    private async _reconnectIfDisconnected(): Promise<void> {
        if (mongoose.connection.readyState === 1) return;

        await mongoose.connect(nconf.get("dbConnectionStr"));
    };

    async save<DocType>(collRef: HydratedDocument<DocType>, options?: SaveOptions | undefined): Promise<DocType | (Document<unknown, any, DocType> & { _id?: unknown; } & Required<{ _id: unknown; }>)> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        return collRef.save(options);
    };

    async insertMany<DocType>(collRef: Model<DocType>, docs: DocType[], options?: InsertManyOptions & { lean: true }): Promise<mongoose.HydratedDocument<mongoose.MergeType<mongoose.MergeType<DocType, DocType>, mongoose.Require_id<DocType>>, {}, {}>[] | MergeType<MergeType<DocType, DocType>, Require_id<DocType>>[]> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!docs) throw new GenericError({ error: new Error(`Expected array of objects, but got ${typeof docs}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        type InsertManyResType = Promise<mongoose.HydratedDocument<mongoose.MergeType<mongoose.MergeType<DocType, DocType>, mongoose.Require_id<DocType>>, {}, {}>[] | MergeType<MergeType<DocType, DocType>, Require_id<DocType>>[]>;

        let _query: InsertManyResType = collRef.insertMany(docs);
        if (options)
            _query = collRef.insertMany(docs, options);

        return _query;
    };

    async findById<DocType>(collRef: Model<DocType>, id: string | Types.ObjectId, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!id) throw new GenericError({ error: new Error(`Expected string, but got ${typeof id}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.findById(id, undefined, options);

        return _query;
    };

    async findOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.findOne(query, undefined, options);

        return _query;
    };

    async find<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType>[]> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.find(query, undefined, options);

        return _query;
    };

    async countDocuments<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<number> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.countDocuments(query, options);

        return _query;
    };

    async aggregate<DocType>(collRef: Model<DocType>, pipeline?: PipelineStage[] | undefined, options?: AggregateOptions | undefined): Promise<any[]> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!pipeline) throw new GenericError({ error: new Error(`Expected array of objects, but got ${typeof pipeline}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.aggregate(pipeline, options);

        return _query;
    };

    async findByIdAndUpdate<DocType>(collRef: Model<DocType>, id: string | Types.ObjectId, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!id) throw new GenericError({ error: new Error(`Expected string, but got ${typeof id}`), errorCode: 500 });
        if (!updateQuery) throw new GenericError({ error: new Error(`Expected update query object, but got ${typeof updateQuery}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.findByIdAndUpdate(id, updateQuery, options);

        return await _query;
    };

    async findOneAndUpdate<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });
        if (!updateQuery) throw new GenericError({ error: new Error(`Expected update query object, but got ${typeof updateQuery}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.findOneAndUpdate(query, updateQuery, options);

        return await _query;
    };

    async updateOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });
        if (!updateQuery) throw new GenericError({ error: new Error(`Expected update query object, but got ${typeof updateQuery}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.updateOne(query, updateQuery, options);

        return await _query;
    };

    async updateMany<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });
        if (!updateQuery) throw new GenericError({ error: new Error(`Expected update query object, but got ${typeof updateQuery}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.updateMany(query, updateQuery, options);

        return await _query;
    };

    async findOneAndDelete<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null> {
        if (!collRef) throw new GenericError({ error: new Error(`Expected collection reference, but got ${typeof collRef}`), errorCode: 500 });
        if (!query) throw new GenericError({ error: new Error(`Expected query object, but got ${typeof query}`), errorCode: 500 });

        await this._reconnectIfDisconnected();

        const _query = collRef.findOneAndDelete(query, options);

        return await _query;
    };
};
