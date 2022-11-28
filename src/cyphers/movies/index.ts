import { readFileSync } from 'fs';
import { join } from 'path';

const cypherFromFile = (name: string) =>
  readFileSync(join(__dirname, `./${name}.cypher`)).toString();

export const upsertMovies = cypherFromFile('upsertMovies');
export const getMovies = cypherFromFile('getMovies');
