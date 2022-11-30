import { Session } from 'neo4j-driver';
import {
  deleteMovies,
  getMovies,
  upsertMovies,
  upsertMoviesActors,
  upsertMoviesReviewers,
} from '../cyphers/movies';
import {
  DeleteMoviesParams,
  DeleteMoviesResult,
  GetMoviesParams,
  GetMoviesResult,
  UpsertMovieParams,
  UpsertMoviesActorsResult,
  UpsertMoviesResult,
  UpsertMoviesReviewersResult,
} from '../types/movies';

export const moviesApi = (session: Session) => ({
  upsertMovie: async (params: UpsertMovieParams) => {
    const tx = await session.beginTransaction();
    const moviesResult = await tx.run<UpsertMoviesResult>(upsertMovies, params);
    const [actorsResult, reviewersResult] = await Promise.all([
      tx.run<UpsertMoviesActorsResult>(upsertMoviesActors, params),
      tx.run<UpsertMoviesReviewersResult>(upsertMoviesReviewers, params),
    ]);
    await tx.commit();

    return {
      moviesResult,
      actorsResult,
      reviewersResult,
    };
  },
  getMovies: async (params: GetMoviesParams = { titles: [] }) => {
    const result = await session.run<GetMoviesResult>(getMovies, params);
    const movies = result.records.map((record) => record.get('movie'));
    return movies;
  },
  deleteMovies: async (params: DeleteMoviesParams = { titles: [] }) => {
    const result = await session.run<DeleteMoviesResult>(deleteMovies, params);
    return result;
  },
});
