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
    const { moviesResult, actorsResult, reviewersResult } = await moviesApi(
      session
    ).upsertMovie({
      movies: sampleMovies,
    });

    const resultStats = moviesResult.summary.counters.updates();
    expect(resultStats.nodesCreated).toEqual(2);

    const actorsResultStats = actorsResult.summary.counters.updates();
    expect(actorsResultStats.nodesCreated).toBe(2 + 3);

    const reviewersResultStats = reviewersResult.summary.counters.updates();
    expect(reviewersResultStats.nodesCreated).toBe(2);
  });

  it('should get the 2 movies previously created', async () => {
    const movies = await moviesApi(session).getMovies();

    movies.forEach((movie) => {
      const sampleMovie = sampleMovies.find(
        (item) => item.title === movie.title
      )!;
      const { actors, reviewers, ...rootProps } = sampleMovie;
      const {
        actors: resultActors,
        reviewers: resultReviewers,
        ...resultRootProps
      } = movie;
      expect(resultRootProps).toEqual(rootProps);
      expect(resultActors).toIncludeSameMembers(actors);
      expect(resultReviewers).toIncludeSameMembers(reviewers);
    });
  });
});
