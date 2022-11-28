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

  it('should get only The Godfather', async () => {
    const results = await moviesApi(session).getMovies({
      titles: ['The Godfather'],
    });

    results.forEach((result) => {
      const sampleMovie = sampleMovies.find(
        (item) => item.title === result.title
      )!;
      const { actors, reviewers, ...rootProps } = sampleMovie;
      const {
        actors: resultActors,
        reviewers: resultReviewers,
        ...resultRootProps
      } = result;
      expect(resultRootProps).toEqual(rootProps);
      expect(resultActors).toIncludeSameMembers(actors);
      expect(resultReviewers).toIncludeSameMembers(reviewers);
    });
  });

  it('should update The Godfather tagline', async () => {
    const theGodfather = sampleMovies.find(
      (movie) => movie.title === 'The Godfather'
    )!;
    theGodfather.tagline = "An offer you can't refuse. Updated.";

    await moviesApi(session).upsertMovie({
      movies: [theGodfather],
    });

    const movies = await moviesApi(session).getMovies({
      titles: ['The Godfather'],
    });
    const theGodfatherUpdated = movies.find(
      (movie) => movie.title === 'The Godfather'
    )!;

    expect(theGodfatherUpdated.tagline).toEqual(theGodfather.tagline);
  });

  it('should add one actor and one reviewer to The Godfather', async () => {
    const theGodfather = sampleMovies.find(
      (movie) => movie.title === 'The Godfather'
    )!;
    theGodfather.actors.push({
      name: 'James Caan',
      born: 1940,
      roles: ['Sonny Corleone'],
    });
    theGodfather.reviewers.push({
      name: 'Vincent Canby',
      rating: 100,
    });

    await moviesApi(session).upsertMovie({
      movies: [theGodfather],
    });

    const movies = await moviesApi(session).getMovies({
      titles: ['The Godfather'],
    });
    const theGodfatherUpdated = movies.find(
      (movie) => movie.title === 'The Godfather'
    )!;

    expect(theGodfatherUpdated.actors).toIncludeSameMembers(
      theGodfather.actors
    );
    expect(theGodfatherUpdated.reviewers).toIncludeSameMembers(
      theGodfather.reviewers
    );
  });

  it('should remove one actor and one reviewer from The Godfather', async () => {
    const theGodfather = sampleMovies.find(
      (movie) => movie.title === 'The Godfather'
    )!;
    theGodfather.actors.pop();
    theGodfather.reviewers.pop();

    await moviesApi(session).upsertMovie({
      movies: [theGodfather],
    });

    const movies = await moviesApi(session).getMovies({
      titles: ['The Godfather'],
    });
    const theGodfatherUpdated = movies.find(
      (movie) => movie.title === 'The Godfather'
    )!;

    expect(theGodfatherUpdated.actors).toIncludeSameMembers(
      theGodfather.actors
    );
    expect(theGodfatherUpdated.reviewers).toIncludeSameMembers(
      theGodfather.reviewers
    );
  });

  it('should delete The Godfather', async () => {
    const result = await moviesApi(session).deleteMovies({
      titles: ['The Godfather'],
    });

    const resultStats = result.summary.counters.updates();
    expect(resultStats.nodesDeleted).toBe(1);

    const movies = await moviesApi(session).getMovies({
      titles: ['The Godfather'],
    });
    expect(movies).toHaveLength(0);
  });
});
