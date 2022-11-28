import express from 'express';
import dotenv from 'dotenv';
import { moviesApi } from './graphApi/movies';

dotenv.config();

const main = async () => {
  const port = process.env.PORT || 8000;
  const app = express();

  app.get('/', async (req, res) => {
    const result = await moviesApi().getMovies();
    res.send(result);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
  });
};

main();
