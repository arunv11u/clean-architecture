import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { testConfig } from './utils';

export = async function globalTeardown() {
  try {
    if (testConfig.mongodb.memory) {
      // Config to decided if an mongodb-memory-server instance should be used
      const replSet: MongoMemoryReplSet = (global as any).__MONGOINSTANCE;
      await replSet.stop();
    }
  } catch (error) {
    console.error('Error in global teardown :', error);
  }
};
