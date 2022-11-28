MATCH (movie:Movie)
RETURN movie {
  .*,
  actors: [ (actor:Person)-[r:ACTED_IN]->(movie) | actor { .*, roles: r.roles } ],
  reviewers: [ (reviewer:Person)-[r:REVIEWED]->(movie) | reviewer { .*, rating: r.rating } ]
}
