UNWIND $movies AS movieItem
MATCH (movie:Movie {title: movieItem.title})

WITH movieItem, movie
UNWIND movieItem.actors AS actorItem

MERGE (actor:Person {name: actorItem.name})
ON CREATE SET actor += {
  born: actorItem.born
}

WITH movieItem, movie, actor, actorItem

MERGE (actor)-[actedIn:ACTED_IN {
  roles: actorItem.roles
}]->(movie)

// Remove old actors that are not present in the new payload
WITH movieItem, movie, actor, actedIn
CALL {
  WITH movieItem, movie
  UNWIND movieItem.actors AS actorItem
  WITH movie, collect(actorItem.name) AS actorName
  MATCH (p:Person)-[r:ACTED_IN]->(movie)
  WHERE NOT p.name IN actorName
  DELETE r
  RETURN count(*) AS deleteCount
}

RETURN actor, actedIn, movie
