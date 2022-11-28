UNWIND $movies AS movieItem
MATCH (movie:Movie {title: movieItem.title})

WITH movieItem, movie
UNWIND movieItem.reviewers AS reviewerItem

MERGE (reviewer:Person {name: reviewerItem.name})
ON CREATE SET reviewer += {
  born: reviewerItem.born
}

WITH movieItem, movie, reviewer, reviewerItem

MERGE (reviewer)-[reviewed:REVIEWED {
  rating: reviewerItem.rating
}]->(movie)

// Remove old reviewers that are not present in the new payload
WITH movieItem, movie, reviewer, reviewed
CALL {
  WITH movieItem, movie
  UNWIND movieItem.reviewers AS reviewerItem
  WITH movie, collect(reviewerItem.name) AS reviewerName
  MATCH (p:Person)-[r:REVIEWED]->(movie)
  WHERE NOT p.name IN reviewerName
  DELETE r
  RETURN count(*) AS deleteCount
}

RETURN reviewer, reviewed, movie
