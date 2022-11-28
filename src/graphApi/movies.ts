import { Session } from 'neo4j-driver';
import {
  getMovies,
  upsertMovies,
  upsertMoviesActors,
  upsertMoviesReviewers,
} from '../cyphers/movies';
import { Movie } from '../types/movies';

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
  getMovies: async (): Promise<Movie[]> => {
    const result = await session.run(getMovies);
    const movies = result.records.map((record) => record.get('movie'));
    return movies;
  },
});
