WITH
    CASE
        WHEN $titles = [] THEN null
        ELSE $titles
    END AS titlesParam

MATCH (movie:Movie)
WHERE titlesParam IS NULL OR movie.title IN titlesParam
RETURN movie {
  .*,
  actors: [ (actor:Person)-[r:ACTED_IN]->(movie) | actor { .*, roles: r.roles } ],
  reviewers: [ (reviewer:Person)-[r:REVIEWED]->(movie) | reviewer { .*, rating: r.rating } ]
}
