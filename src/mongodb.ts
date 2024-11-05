import { MongoClient, ServerApiVersion } from 'mongodb';
import { MDB_HOSTNAME, MDB_PASSWORD, MDB_PORT, MDB_USERNAME } from './env';

const uri = `mongodb://${MDB_USERNAME}:${MDB_PASSWORD}@${MDB_HOSTNAME}:${MDB_PORT}/?retryWrites=true&w=majority`;

export const mdbClient = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);