import { Driver, Session } from 'neo4j-driver';
import { moviesApi } from './movies';
import { neo4jConfigFile } from './utils/neo4jConfigFile';

describe('moviesApi', () => {
  jest.setTimeout(180_000);

  let driver: Driver;
  let session: Session;

  const clearDatabase = async () => {
    await session.run('MATCH (n) DETACH DELETE n');
  };

  beforeAll(async () => {
    driver = await neo4jConfigFile().driver();
    session = driver.session();
    await clearDatabase();
  });

  afterAll(async () => {
    await session.close();
    await driver.close();
    //await container.stop();
  });

  it('should create a movie', async () => {
    const result = await session.run(
      'CREATE (m:Movie {title: "The Godfather"}) RETURN m'
    );
    const resultStats = result.summary.counters.updates();
    expect(resultStats.nodesCreated).toEqual(1);
  });

  it('should return upcoming movies data', async () => {
    const result = await moviesApi().getMovies();
    expect(result).toEqual('Upcoming movies data');
  });
});
