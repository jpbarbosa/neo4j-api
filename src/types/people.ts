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
