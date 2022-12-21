import mongoose, { Aggregate, HydratedDocument, Query, Types } from 'mongoose';
import { MongooseSchemaServiceImpl } from '../../utils';

const mongooseSchemaService = new MongooseSchemaServiceImpl();
const schemaOptions = mongooseSchemaService.schemaOptions();


enum SaveTokenTypes {
    refresh = "REFRESH"
};


interface TokenAttrs {
    _id?: Types.ObjectId;
    type: SaveTokenTypes;
    value: string;
    user: Types.ObjectId;
    refreshTokenUsed: Types.ObjectId;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
};

interface TokenDoc extends mongoose.Document {
    type: SaveTokenTypes;
    value: string;
    user: Types.ObjectId;
    refreshTokenUsed: Types.ObjectId;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
};

type BuildToken = TokenAttrs;

type TokenObj = TokenAttrs & { id: string };

interface TokenModel extends mongoose.Model<TokenDoc> {
    build(attrs: BuildToken): HydratedDocument<TokenDoc>;
    jsonObj(doc: HydratedDocument<TokenDoc> | HydratedDocument<TokenDoc[]> | null): TokenObj | TokenObj[] | null;
};

const tokenSchema = new mongoose.Schema<TokenDoc, TokenModel>(
    {
        type: { type: String, enum: SaveTokenTypes, required: [true, 'is a required field'] },
        value: { type: String, required: [true, 'is a required field'] },
        user: { type: "ObjectId", required: [true, 'is a required field'] },
        refreshTokenUsed: { type: "ObjectId", required: [true, 'is a required field'] },
        isDeleted: { type: Boolean, default: false },
        creationDate: { type: Date },
        lastModifiedDate: { type: Date }
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


const Token = mongoose.model<TokenDoc, TokenModel>('tokens', tokenSchema);


export {
    SaveTokenTypes,
    TokenAttrs,
    TokenDoc,
    BuildToken,
    Token
};
