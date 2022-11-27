import mongoose, { Aggregate, HydratedDocument, Query, ObjectId } from 'mongoose';
import { MongooseSchemaServiceImpl } from '../../utils';

const mongooseSchemaService = new MongooseSchemaServiceImpl();
const schemaOptions = mongooseSchemaService.schemaOptions();

interface TokenAttrs {
    value: string;
    user: ObjectId;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
};

interface TokenDoc extends mongoose.Document {
    value: string;
    user: ObjectId;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
};

type BuildToken = TokenAttrs;

type TokenObj = TokenAttrs & { id: string };

interface TokenModel extends mongoose.Model<TokenDoc> {
    build(attrs: BuildToken): HydratedDocument<TokenDoc>;
    jsonObj(doc: HydratedDocument<TokenDoc> | HydratedDocument<TokenDoc[]> | null): TokenObj | TokenObj[] | null;
};

const tokenSchema = new mongoose.Schema<TokenDoc, TokenModel>(
    {
        value: { type: String, required: [true, 'is a required field'] },
        user: { type: mongoose.Types.ObjectId, required: [true, 'is a required field'] },
        isDeleted: { type: Boolean, default: false },
        creationDate: { type: Date },
        lastModifiedDate: { type: Date },
        createdBy: { type: mongoose.Types.ObjectId, ref: 'users' },
        updatedBy: { type: mongoose.Types.ObjectId, ref: 'users' },
    },
    schemaOptions()
);

//* Mongos token helper functions here.
tokenSchema.statics.build = (attrs: BuildToken): HydratedDocument<TokenDoc> => {
    return new Token(attrs);
};

tokenSchema.statics.jsonObj = (doc: HydratedDocument<TokenDoc> | HydratedDocument<TokenDoc[]>): TokenObj | TokenObj[] | null => {
    if (Array.isArray(doc))
        return doc.map((ele) => ele.toJSON()) as TokenObj[];

    if (doc) return doc.toJSON() as (TokenObj | null);

    return null;
};

//* PRE and POST middlewares here.

//* version update middleware
tokenSchema.pre<Query<TokenDoc, TokenDoc>>('update', mongooseSchemaService.versionUpdate());

//* isDeleted Middleware
tokenSchema.pre<Query<TokenDoc, TokenDoc>>('find', mongooseSchemaService.excludeDeleteMiddleware());
tokenSchema.pre<Query<TokenDoc, TokenDoc>>('findOne', mongooseSchemaService.excludeDeleteMiddleware());
tokenSchema.pre<Query<TokenDoc, TokenDoc>>('countDocuments', mongooseSchemaService.excludeDeleteMiddleware());
tokenSchema.pre<Query<TokenDoc, TokenDoc>>('count', mongooseSchemaService.excludeDeleteMiddleware());
tokenSchema.pre<Query<TokenDoc, TokenDoc>>('update', mongooseSchemaService.excludeDeleteMiddleware());
tokenSchema.pre<Aggregate<TokenDoc>>('aggregate', mongooseSchemaService.excludeDeleteAggregateMiddleware());

//* indexing here.


//* VirtualTypes here.
tokenSchema.virtual('locals');
const Token = mongoose.model<TokenDoc, TokenModel>('tokens', tokenSchema);


export {
    TokenAttrs,
    BuildToken,
    Token
};