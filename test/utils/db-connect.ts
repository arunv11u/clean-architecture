import mongoose from 'mongoose';


const connect = async () => {
    await mongoose.connect(`${process.env.MONGO_URI}`);
};

const disconnect = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
};

export {
    connect,
    disconnect
};
