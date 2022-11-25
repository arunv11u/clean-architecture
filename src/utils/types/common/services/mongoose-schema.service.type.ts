import { Aggregate, CallbackError, Document, Query, Types } from "mongoose";

abstract class BaseMongooseSchemaService {
    abstract get transform(): (doc: any, ret: any) => any;
    abstract schemaOptions(): Function;
    abstract getDocId(): Types.ObjectId;
    abstract setCreatedByAndUpdatedByOnSave(): (this: Query<any, any, {}, any>, next: (err: CallbackError | undefined) => void) => void;
    abstract setCreatedByAndUpdatedByOnUpdate(): (this: Query<any, any, {}, any>, next: (err: CallbackError | undefined) => void) => void;
    abstract versionUpdate(): (this: Query<any, any, {}, any>, next: (err: CallbackError | undefined) => void) => void;
    abstract excludeDeleteMiddleware(): (this: Query<any, any, {}, any>, next: (err: CallbackError | undefined) => void) => void;
    abstract excludeDeleteAggregateMiddleware(): (this: Aggregate<any>, next: (err: CallbackError | undefined) => void) => void;
};

export {
    BaseMongooseSchemaService
};