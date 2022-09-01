import { Pool } from 'pg';
import pgSession from 'connect-pg-simple';
import dotenv from 'dotenv';

dotenv.config();

const getConnectionString = () => {
  const APPLICATION_USER = process.env.APPLICATION_USER;
  const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
  const POSTGRES_HOST = process.env.POSTGRES_HOST;
  const POSTGRES_PORT = process.env.POSTGRES_PORT;
  const APPLICATION_DB = process.env.APPLICATION_DB;
  return `postgres://${APPLICATION_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${APPLICATION_DB}`;
};

const getStoreSession = (session: any) => {
  console.log();
  const storePool = new Pool({
    connectionString: getConnectionString(),
    max: 3,
  });
  const storeSession = pgSession(session);

  return new storeSession({ pool: storePool });
};

export default getStoreSession;
