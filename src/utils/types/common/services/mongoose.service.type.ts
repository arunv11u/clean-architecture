import { FilterQuery, HydratedDocument, Model, QueryOptions, SaveOptions, Document, Types, UpdateQuery, UpdateWithAggregationPipeline, PipelineStage, InsertManyOptions, MergeType, Require_id } from "mongoose";
import { AggregateOptions, UpdateResult } from 'mongodb';

interface BaseMongooseService {
    findById<DocType>(collRef: Model<DocType>, id: string, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    findOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    find<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType>[]>;
    aggregate<DocType>(collRef: Model<DocType>, pipeline?: PipelineStage[], options?: AggregateOptions): Promise<any[]>;
    countDocuments<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<number>;
    save<DocType>(docRef: HydratedDocument<DocType>, options?: SaveOptions): Promise<DocType | (Document<unknown, any, DocType> & { _id?: unknown; } & Required<{ _id: unknown; }>)>;
    insertMany<DocType>(collRef: Model<DocType>, docs: DocType[], options: InsertManyOptions & { lean: true }): Promise<MergeType<MergeType<DocType, DocType>, Require_id<DocType>>[]>;
    findByIdAndUpdate<DocType>(collRef: Model<DocType>, id: string, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    findOneAndUpdate<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    updateOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult>;
    updateMany<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult>;
    findOneAndDelete<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
};

export {
    BaseMongooseService
};