import mongoose from 'mongoose';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

jest.setTimeout(30000);

const replSet = new MongoMemoryReplSet({
  replSet: { storageEngine: 'wiredTiger' }
});

export const connect = async () => {
  await replSet.waitUntilRunning();

  mongoose.Promise = Promise;
  replSet.getUri().then((mongoUri) => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', (e) => {
      if (e.message.code === 'ETIMEDOUT') {
        mongoose.connect(mongoUri, mongooseOpts);
      }
    });
  });
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await replSet.stop();
};

export const clearDatabase = () => {
  const { collections } = mongoose.connection;
  const deleteCollectionJob = [];

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const key in collections) {
    const collection = collections[key];
    deleteCollectionJob.push(collection.deleteMany());
  }

  Promise.all(deleteCollectionJob);
};
