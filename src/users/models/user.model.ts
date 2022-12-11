import mongoose, { Aggregate, HydratedDocument, Query } from 'mongoose';
import { CurrentUser, MongooseSchemaServiceImpl } from '../../utils';

const mongooseSchemaService = new MongooseSchemaServiceImpl();
const schemaOptions = mongooseSchemaService.schemaOptions();

interface UserPhone {
    code: string;
    number: string;
};

interface UserAttrs {
    name: string;
    userId: string;
    email?: string;
    phone?: UserPhone;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
};

interface UserDoc extends mongoose.Document {
    name: string;
    userId: string;
    email?: string;
    phone?: UserPhone;
    isDeleted?: boolean;
    creationDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
};

type BuildUser = UserAttrs & { locals: CurrentUser<UserAttrs> };

type UserObj = UserAttrs & { id: string };

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: BuildUser): HydratedDocument<UserDoc>;
    jsonObj(doc: HydratedDocument<UserDoc> | HydratedDocument<UserDoc[]> | null): UserObj | UserObj[] | null;
};

const phoneSchema = new mongoose.Schema<UserPhone, any>({
    code: { type: String, required: [true, 'is a required field'] },
    number: { type: String, required: [true, 'is a required field'] }
}, { _id: false, id: false });

const userSchema = new mongoose.Schema<UserDoc, UserModel>(
    {
        name: { type: String, required: [true, 'is a required field'] },
        userId: { type: String, required: [true, 'is a required field'] },
        email: { type: String },
        phone: { type: phoneSchema },
        isDeleted: { type: Boolean, default: false },
        creationDate: { type: Date },
        lastModifiedDate: { type: Date },
        createdBy: { type: mongoose.Types.ObjectId, ref: 'users' },
        updatedBy: { type: mongoose.Types.ObjectId, ref: 'users' },
    },
    schemaOptions()
);

//* Mongos user helper functions here.
userSchema.statics.build = (attrs: BuildUser): HydratedDocument<UserDoc> => {
    return new User(attrs);
};

userSchema.statics.jsonObj = (doc: HydratedDocument<UserDoc> | HydratedDocument<UserDoc[]>): UserObj | UserObj[] | null => {
    if (Array.isArray(doc))
        return doc.map((ele) => ele.toJSON());

    if (doc) return doc.toJSON();

    return null;
};

//* PRE and POST middlewares here.

//* createdByAndUpdatedBy middleware.
userSchema.pre<Query<UserDoc, UserDoc>>('save', mongooseSchemaService.setCreatedByAndUpdatedByOnSave());
userSchema.pre<Query<UserDoc, UserDoc>>('update', mongooseSchemaService.setCreatedByAndUpdatedByOnUpdate());


//* version update middleware
userSchema.pre<Query<UserDoc, UserDoc>>('update', mongooseSchemaService.versionUpdate());

//* isDeleted Middleware
userSchema.pre<Query<UserDoc, UserDoc>>('find', mongooseSchemaService.excludeDeleteMiddleware());
userSchema.pre<Query<UserDoc, UserDoc>>('findOne', mongooseSchemaService.excludeDeleteMiddleware());
userSchema.pre<Query<UserDoc, UserDoc>>('countDocuments', mongooseSchemaService.excludeDeleteMiddleware());
userSchema.pre<Query<UserDoc, UserDoc>>('count', mongooseSchemaService.excludeDeleteMiddleware());
userSchema.pre<Query<UserDoc, UserDoc>>('update', mongooseSchemaService.excludeDeleteMiddleware());
userSchema.pre<Aggregate<UserDoc>>('aggregate', mongooseSchemaService.excludeDeleteAggregateMiddleware());

//* indexing here.
userSchema.index({ "userId": 1 }, { unique: true });


//* VirtualTypes here.
userSchema.virtual('locals');
userSchema.virtual('excludeLocals');

const User = mongoose.model<UserDoc, UserModel>('users', userSchema);


export {
    UserAttrs,
    UserDoc,
    BuildUser,
    User
};
