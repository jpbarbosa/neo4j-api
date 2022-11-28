MATCH (movie:Movie)
WHERE movie.title IN ($titles)
DETACH DELETE movie
RETURN $titles AS titles
