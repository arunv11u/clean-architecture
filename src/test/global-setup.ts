import "reflect-metadata";
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { testConfig } from './utils';

export = async function globalSetup() {
    try {
        if (testConfig.mongodb.memory) {

            // Config to decided if an mongodb-memory-server instance should be used
            // it's needed in global space, because we don't want to create a new instance every test-suite
            const replSet = await MongoMemoryReplSet.create({
                replSet: {
                    count: 3,
                    storageEngine: 'wiredTiger',
                }
            });
            const uri = replSet.getUri();
            process.env.MONGO_URI = uri;
            (global as any).__MONGOINSTANCE = replSet;
            process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
        } else {
            process.env.MONGO_URI = `mongodb://${testConfig.mongodb.ip}:${testConfig.mongodb.port}`;
        };

        // The following is to make sure the database is clean before an test starts
        process.env.MONGO_URI = `${process.env.MONGO_URI}/${testConfig.mongodb.dataBase}?replicaSet=testset`;

        await mongoose.connect(process.env.MONGO_URI); // /${config.dataBase}
        await mongoose.connection.db.dropDatabase();
        await mongoose.disconnect();

        return true;
    } catch (error) {
        console.error('Error in test global setup :', error);
    };
};
