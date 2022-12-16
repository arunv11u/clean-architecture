import mongoose, { Aggregate, HydratedDocument, Query } from 'mongoose';
import { MongooseSchemaServiceImpl } from '../../../utils/services';

const mongooseSchemaService = new MongooseSchemaServiceImpl();

interface SessionDataCookie {
    originalMaxAge: number | null;
    expires: Date | null;
    secure: boolean;
    httpOnly: boolean;
    path: string;
};
interface SessionData {
    cookie: SessionDataCookie;
    auth?: string;
    refresh?: string;
};


interface SessionDoc extends mongoose.Document {
    _id: String;
    data: SessionData;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
};

type BuildSession = HydratedDocument<SessionDoc>;

type SessionObj = HydratedDocument<SessionDoc> & { id: string };

interface SessionModel extends mongoose.Model<SessionDoc> {
    build(attrs: BuildSession): HydratedDocument<SessionDoc>;
    jsonObj(doc: HydratedDocument<SessionDoc> | HydratedDocument<SessionDoc[]> | null): SessionObj | SessionObj[] | null;
};

const sessionDataCookieSchema = new mongoose.Schema<SessionDataCookie, any>({
    originalMaxAge: { type: Number },
    expires: { type: Date },
    secure: { type: Boolean },
    httpOnly: { type: Boolean },
    path: { type: String }
}, { _id: false, id: false, toJSON: { transform: mongooseSchemaService.transform } });

const sessionDataSchema = new mongoose.Schema<SessionData, any>({
    cookie: { type: sessionDataCookieSchema, required: [true, 'is a required field'] },
    auth: { type: String },
    refresh: { type: String }
}, { _id: false, id: false, toJSON: { transform: mongooseSchemaService.transform } });

const sessionSchema = new mongoose.Schema<SessionDoc, SessionModel>(
    {
        _id: { type: String, required: [true, 'is a required field'] },
        data: { type: sessionDataSchema, required: [true, 'is a required field'] },
        isDeleted: { type: Boolean, default: false },
        creationDate: { type: Date },
        lastModifiedDate: { type: Date }
    },
    { _id: false, id: false, toJSON: { transform: mongooseSchemaService.transform } }
);

//* Mongos session helper functions here.
sessionSchema.statics.build = (attrs: BuildSession): HydratedDocument<SessionDoc> => {
    return new Session(attrs);
};

sessionSchema.statics.jsonObj = (doc: HydratedDocument<SessionDoc> | HydratedDocument<SessionDoc[]>): SessionObj | SessionObj[] | null => {
    if (Array.isArray(doc))
        return doc.map((ele) => ele.toJSON()) as SessionObj[];

    if (doc) return doc.toJSON() as SessionObj;

    return null;
};

//* PRE and POST middlewares here.

//* version update middleware
sessionSchema.pre<Query<SessionDoc, SessionDoc>>('update', mongooseSchemaService.versionUpdate());

//* isDeleted Middleware
sessionSchema.pre<Query<SessionDoc, SessionDoc>>('find', mongooseSchemaService.excludeDeleteMiddleware());
sessionSchema.pre<Query<SessionDoc, SessionDoc>>('findOne', mongooseSchemaService.excludeDeleteMiddleware());
sessionSchema.pre<Query<SessionDoc, SessionDoc>>('countDocuments', mongooseSchemaService.excludeDeleteMiddleware());
sessionSchema.pre<Query<SessionDoc, SessionDoc>>('count', mongooseSchemaService.excludeDeleteMiddleware());
sessionSchema.pre<Query<SessionDoc, SessionDoc>>('update', mongooseSchemaService.excludeDeleteMiddleware());
sessionSchema.pre<Aggregate<SessionDoc>>('aggregate', mongooseSchemaService.excludeDeleteAggregateMiddleware());

//* indexing here.


//* VirtualTypes here.

const Session = mongoose.model<SessionDoc, SessionModel>('sessions', sessionSchema);


export {
    SessionDoc,
    BuildSession,
    Session
};
