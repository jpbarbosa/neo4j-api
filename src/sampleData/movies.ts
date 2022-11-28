import { Movie } from '../types/movies';

export const sampleMovies: Movie[] = [
  {
    title: 'The Godfather',
    released: 1972,
    tagline: "An offer you can't refuse.",
    actors: [
      { name: 'Marlon Brando', born: 1924, roles: ['Godfather'] },
      { name: 'Al Pacino', born: 1940, roles: ['Michel'] },
    ],
    reviewers: [
      { name: 'Marjorie Baumgarten', rating: 100 },
      { name: 'Roger Ebert', rating: 100 },
    ],
  },
  {
    title: "Ferris Bueller's Day Off",
    released: 1986,
    tagline: 'Because life is too beautiful a thing to waste.',
    actors: [
      { name: 'Matthew Broderick', born: 1962, roles: ['Ferris Bueller'] },
      { name: 'Alan Ruck', born: 1956, roles: ['Cameron Frye'] },
      { name: 'Mia Sara', born: 1967, roles: ['Sloane Peterson'] },
    ],
    reviewers: [
      { name: 'Marjorie Baumgarten', rating: 89 },
      { name: 'Roger Ebert', rating: 75 },
    ],
  },
];
