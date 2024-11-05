import 'dotenv/config';

if (!process.env.MDB_USERNAME)
    throw new Error('No username (MDB_USERNAME) given for MongoDB instance.');
export const MDB_USERNAME = process.env.MDB_USERNAME;

if (!process.env.MDB_PASSWORD)
    throw new Error('No password (MDB_PASSWORD) given for MongoDB instance.');
export const MDB_PASSWORD = process.env.MDB_PASSWORD;

if (!process.env.MDB_HOSTNAME)
    console.warn('No hostname (MDB_HOSTNAME) given for MongoDB instance. Assuming "localhost".');
export const MDB_HOSTNAME = process.env.MDB_HOSTNAME ?? 'localhost';

if (!process.env.MDB_PORT)
    console.warn('No port (MDB_PORT) given for MongoDB instance. Assuming "27017".');
export const MDB_PORT = process.env.MDB_PORT ?? '27017';