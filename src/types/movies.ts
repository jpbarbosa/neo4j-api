import { Integer, Node } from 'neo4j-driver';
import {
  ActedInRelationship,
  Actor,
  PersonNode,
  ReviewedRelationship,
  Reviewer,
} from './people';

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

export type MovieNode = Node<Integer, Movie>;

export type GetMoviesResult = {
  movie: Movie;
};

export type UpsertMoviesResult = {
  movie: MovieNode;
};

export type UpsertMoviesActorsResult = {
  actor: PersonNode;
  actedIn: ActedInRelationship;
  movie: MovieNode;
};

export type UpsertMoviesReviewersResult = {
  actor: PersonNode;
  actedIn: ReviewedRelationship;
  movie: MovieNode;
};

export type DeleteMoviesResult = {
  titles: string[];
};
