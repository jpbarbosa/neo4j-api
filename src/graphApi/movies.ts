import { Session } from 'neo4j-driver';
import {
  deleteMovies,
  getMovies,
  upsertMovies,
  upsertMoviesActors,
  upsertMoviesReviewers,
} from '../cyphers/movies';
import { DeleteMoviesParams, GetMoviesParams, Movie } from '../types/movies';

export const moviesApi = (session: Session) => ({
  upsertMovie: async (params: Record<string, any>) => {
    const tx = await session.beginTransaction();
    const moviesResult = await tx.run(upsertMovies, params);
    const actorsResult = await tx.run(upsertMoviesActors, params);
    const reviewersResult = await tx.run(upsertMoviesReviewers, params);
    await tx.commit();

    return {
      moviesResult,
      actorsResult,
      reviewersResult,
    };
  },
  getMovies: async (
    params: GetMoviesParams = { titles: [] }
  ): Promise<Movie[]> => {
    const result = await session.run(getMovies, params);
    const movies = result.records.map((record) => record.get('movie'));
    return movies;
  },
  deleteMovies: async (params: DeleteMoviesParams = { titles: [] }) => {
    const result = await session.run(deleteMovies, params);
    return result;
  },
});
