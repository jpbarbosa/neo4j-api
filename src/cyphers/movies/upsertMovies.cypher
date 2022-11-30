UNWIND $movies AS movieItem
CALL apoc.util.validate(movieItem.title = "", "movieItem.title cannot be a empty string", [movieItem.title])
MERGE (movie:Movie {title: movieItem.title})
SET movie += {
  released: movieItem.released,
  tagline: movieItem.tagline
}
RETURN movie
