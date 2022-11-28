import { Neo4jContainer, StartedNeo4jContainer } from 'testcontainers';
import { neo4jConfigFile } from './graphApi/utils/neo4jConfigFile';

const setup = async (): Promise<void> => {
  let container: StartedNeo4jContainer | undefined = undefined;

  try {
    const driver = await neo4jConfigFile().driver();
    const serverInfo = await driver.getServerInfo();
    console.info(`\nNeo4j container found at ${serverInfo.address}`);
  } catch (e) {
    console.info(`\nNeo4j container is being created...`);

    container = await new Neo4jContainer().withReuse().start();

    await neo4jConfigFile().write({
      boltUri: container.getBoltUri(),
      username: container.getUsername(),
      password: container.getPassword(),
    });
  }
};

export default setup;
