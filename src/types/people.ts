import { Integer, Node, Relationship } from 'neo4j-driver';

export type Person = {
  name: string;
  born?: number;
};

export type ActedIn = {
  roles: string[];
};

export type Actor = Person & ActedIn;

export type Reviewed = {
  rating: number;
};

export type Reviewer = Person & Reviewed;

export type PersonNode = Node<Integer, Person>;

export type ActedInRelationship = Relationship<Integer, ActedIn>;

export type ReviewedRelationship = Relationship<Integer, Reviewed>;
