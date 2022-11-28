import { Session } from 'neo4j-driver';
import { getMovies, upsertMovies } from '../cyphers/movies';
import { Movie } from '../types/movies';

export const moviesApi = (session: Session) => ({
  upsertMovie: async (params: Record<string, any>) => {
    return await session.run(upsertMovies, params);
  },
  getMovies: async (): Promise<Movie[]> => {
    const result = await session.run(getMovies);
    const movies = result.records.map((record) => record.get('movie'));
    return movies;
  },
});
