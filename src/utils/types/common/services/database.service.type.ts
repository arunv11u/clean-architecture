import { FilterQuery, HydratedDocument, Model, QueryOptions, SaveOptions, Document, Types, UpdateQuery, UpdateWithAggregationPipeline, PipelineStage, InsertManyOptions, MergeType, Require_id } from "mongoose";
import { AggregateOptions, UpdateResult } from 'mongodb';

export interface DatabaseService {
    save<DocType>(docRef: HydratedDocument<DocType>, options?: SaveOptions): Promise<DocType | (Document<unknown, any, DocType> & { _id?: unknown; } & Required<{ _id: unknown; }>)>;
    insertMany<DocType>(collRef: Model<DocType>, docs: DocType[], options?: InsertManyOptions & { lean: true }): Promise<HydratedDocument<MergeType<MergeType<DocType, DocType>, Require_id<DocType>>, {}, {}>[] | MergeType<MergeType<DocType, DocType>, Require_id<DocType>>[]>;
    findById<DocType>(collRef: Model<DocType>, id: string | Types.ObjectId, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    findOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    find<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType>[]>;
    countDocuments<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<number>;
    aggregate<DocType>(collRef: Model<DocType>, pipeline?: PipelineStage[], options?: AggregateOptions): Promise<any[]>;
    findByIdAndUpdate<DocType>(collRef: Model<DocType>, id: string | Types.ObjectId, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    findOneAndUpdate<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
    updateOne<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult>;
    updateMany<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, updateQuery: UpdateWithAggregationPipeline | UpdateQuery<DocType>, options?: QueryOptions): Promise<UpdateResult>;
    findOneAndDelete<DocType>(collRef: Model<DocType>, query: FilterQuery<DocType>, options?: QueryOptions): Promise<HydratedDocument<DocType> | null>;
};
