import express from 'express';
import dotenv from 'dotenv';
import { moviesApi } from './graphApi/movies';
import { createSession } from './graphApi/utils/createNeo4jSession';
import { sampleMovies } from './sampleData/movies';

dotenv.config();

const main = async () => {
  const port = process.env.PORT || 8000;
  const app = express();

  const session = createSession();

  app.get('/', async (req, res) => {
    const qsTitles = req.query.titles as string;
    const titles = qsTitles
      ? qsTitles.split(',').map((title) => title.replaceAll('_', ' '))
      : [];
    const result = await moviesApi(session).getMovies({ titles });
    res.send(result);
  });

  app.post('/', async (req, res) => {
    const result = await moviesApi(session).upsertMovie({
      movies: sampleMovies,
    });
    res.send(result);
  });

  app.delete('/', async (req, res) => {
    const qsTitles = req.query.titles as string;
    const titles = qsTitles
      ? qsTitles.split(',').map((title) => title.replaceAll('_', ' '))
      : [];
    if (titles.length === 0) {
      res.status(400).send('Please provide at least one title');
      return;
    }
    const result = await moviesApi(session).deleteMovies({ titles });
    res.send(result);
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
  });
};

main();
