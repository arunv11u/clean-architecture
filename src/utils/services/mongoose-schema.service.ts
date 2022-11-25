import mongoose, { CallbackError } from 'mongoose';
import { GenericError } from '../errors';
import { BaseMongooseSchemaService } from '../types';

export class MongooseSchemaService extends BaseMongooseSchemaService {

    private static _instance: MongooseSchemaService;
    private _transform: (doc: any, ret: any) => any;
    private constructor() {
        super();

        this._transform = (doc: any, ret: any) => {
            const id = doc._id;
            ret.id = id;

            delete ret._id;
            delete ret.__v;

            return ret;
        };
    };

    static getInstance(): MongooseSchemaService {
        if (!MongooseSchemaService._instance) MongooseSchemaService._instance = new MongooseSchemaService();

        return MongooseSchemaService._instance;
    };

    get transform() {
        return this._transform;
    };

    schemaOptions() {
        return (function (this: any) {
            return {
                toJSON: {
                    transform: this._transform,
                },

                timestamps: {
                    createdAt: 'creationDate',
                    updatedAt: 'lastModifiedDate',
                }
            }
        }).bind(this);
    };

    getDocId(id?: string) {
        return new mongoose.Types.ObjectId(id);
    };


    setCreatedByAndUpdatedByOnSave() {
        return function (this: mongoose.Query<any, any, {}, any>,
            next: (err: CallbackError | undefined) => void) {
            const locals: { user: Record<string, any> } = this.get('locals');
            const excludeLocals: boolean = this.get('excludeLocals');

            if (excludeLocals) return next(undefined);

            if (!locals) return next(new GenericError({ error: new Error(`"locals" is required field for setCreatedByAndUpdatedByOnSave mongoose middleware fn`), errorCode: 500 }));
            if (!locals.user) return next(new GenericError({ error: new Error(`"locals.user" doesn't exist in setCreatedByAndUpdatedByOnSave mongoose middleware fn`), errorCode: 500 }));
            if (!locals.user.id) return next(new GenericError({ error: new Error(`"locals.user.id" doesn't exist in setCreatedByAndUpdatedByOnSave mongoose middleware fn`), errorCode: 500 }));

            this.set('createdBy', locals.user.id);
            this.set('updatedBy', locals.user.id);

            return next(undefined);
        };
    };

    setCreatedByAndUpdatedByOnUpdate() {

        return function (this: mongoose.Query<any, any, {}, any>,
            next: (err: CallbackError | undefined) => void) {
            const locals: { user: Record<string, any> } = this.get('locals');
            const excludeLocals: boolean = this.get('excludeLocals');

            if (excludeLocals) return next(undefined);

            if (!locals) return next(new GenericError({ error: new Error(`"locals" is required field for setCreatedByAndUpdatedByOnUpdate mongoose middleware fn`), errorCode: 500 }));
            if (!locals.user) return next(new GenericError({ error: new Error(`"locals.user" doesn't exist in setCreatedByAndUpdatedByOnUpdate mongoose middleware fn`), errorCode: 500 }));
            if (!locals.user.id) return next(new GenericError({ error: new Error(`"locals.user.id" doesn't exist in setCreatedByAndUpdatedByOnUpdate mongoose middleware fn`), errorCode: 500 }));

            this.set('updatedBy', locals.user.id);
            return next(undefined);
        };

    };

    versionUpdate() {
        return function (this: mongoose.Query<any, any, {}, any>,
            next: (err: CallbackError | undefined) => void) {

            this.update({}, { $inc: { __v: 1 } }, next);

            return next(undefined);
        };
    };


    excludeDeleteMiddleware() {
        return function (this: mongoose.Query<any, any, {}, any>,
            next: (err: CallbackError | undefined) => void) {
            if (
                !(
                    JSON.stringify(this.getQuery().$or) ===
                    JSON.stringify([{ isDeleted: true }, { isDeleted: false }])
                ) &&
                !this.getQuery().isDeleted
                &&
                !(this.getQuery().$and?.some((ele) => (Object(ele).hasOwnProperty("isDeleted")) || (JSON.stringify(ele.$or) === JSON.stringify([{ isDeleted: true }, { isDeleted: false }]))))
            )
                this.where({ isDeleted: false });

            return next(undefined);
        };
    };

    excludeDeleteAggregateMiddleware() {
        return function (this: mongoose.Aggregate<any>,
            next: (err: CallbackError | undefined) => void) {
            const options = this.options;
            if (options["ignoreSoftDelete"]) return next(undefined);

            this.pipeline().unshift({ $match: { isDeleted: false } });
            return next(undefined);
        };
    };
};
