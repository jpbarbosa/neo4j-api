import { moviesApi } from './movies';

describe('moviesApi', () => {
  it('should return upcoming movies data', async () => {
    const result = await moviesApi().getMovies();
    expect(result).toEqual('Upcoming movies data');
  });
});
