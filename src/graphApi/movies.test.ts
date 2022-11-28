import { Driver, Session } from 'neo4j-driver';
import { sampleMovies } from '../sampleData/movies';
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

  it('should create 2 movies', async () => {
    const result = await moviesApi(session).upsertMovie({
      movies: sampleMovies,
    });

    const resultStats = result.summary.counters.updates();
    expect(resultStats.nodesCreated).toEqual(2);
  });

  it('should get the 2 movies previously created', async () => {
    const result = await moviesApi(session).getMovies();
    expect(result).toIncludeSameMembers(sampleMovies);
  });
});
