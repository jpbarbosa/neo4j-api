import neo4j from 'neo4j-driver';
import dotenv from 'dotenv';

dotenv.config();

export const createSession = () => {
  const { NEO4J_HOST, NEO4J_USER, NEO4J_PASS } = process.env;

  const driver = neo4j.driver(
    `neo4j+s://${NEO4J_HOST}`,
    neo4j.auth.basic(NEO4J_USER, NEO4J_PASS),
    {
      disableLosslessIntegers: true,
    }
  );

  const session = driver.session({
    database: 'neo4j',
  });

  return session;
};
