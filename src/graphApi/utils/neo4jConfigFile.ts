import * as fs from 'fs';
import neo4j, { Driver } from 'neo4j-driver';

type Neo4jContainerConfig = {
  boltUri: string;
  username: string;
  password: string;
};

export const neo4jConfigFile = (filename = './.neo4jContainerConfig.json') => {
  const read = async (): Promise<Neo4jContainerConfig> => {
    const neo4jContainerConfigFile = fs.readFileSync(filename);
    return JSON.parse(neo4jContainerConfigFile.toString());
  };

  const write = async (neo4jContainerConfig: Neo4jContainerConfig) => {
    fs.writeFileSync(filename, JSON.stringify(neo4jContainerConfig, null, 2));
  };

  const driver = async (): Promise<Driver> => {
    const { boltUri, username, password } = await read();
    const driver = neo4j.driver(boltUri, neo4j.auth.basic(username, password));
    return driver;
  };

  return {
    read,
    write,
    driver,
  };
};
