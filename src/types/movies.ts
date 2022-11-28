import { Actor, Reviewer } from './people';

export type Movie = {
  title: string;
  released: number;
  tagline: string;
  actors: Actor[];
  reviewers: Reviewer[];
};

export type GetMoviesParams = {
  titles: string[];
};

export type DeleteMoviesParams = {
  titles: string[];
};
