UNWIND $movies AS movieItem
MERGE (movie:Movie {title: movieItem.title})
SET movie += {
  released: movieItem.released,
  tagline: movieItem.tagline
}
RETURN movie
