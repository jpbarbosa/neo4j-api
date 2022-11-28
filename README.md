# Neo4j API

A sample API to show Neo4j usage with TypeScript, in a TDD fashion backed by Jest and Testcontainers, and with large transactions splitted into multiple Cypher queries.

### Step-by-Step Tutorial (build your own app)

https://github.com/jpbarbosa/neo4j-api/wiki

### Test Result

```
Determining test suites to run...
Neo4j container found at localhost:55001
 PASS  src/graphApi/movies.test.ts
  moviesApi
    ✓ should create 2 movies (33 ms)
    ✓ should get the 2 movies previously created (12 ms)
    ✓ should get only The Godfather (7 ms)
    ✓ should update The Godfather tagline (27 ms)
    ✓ should add one actor and one reviewer to The Godfather (29 ms)
    ✓ should remove one actor and one reviewer from The Godfather (28 ms)
    ✓ should delete The Godfather (14 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.933 s, estimated 1 s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

### Requirements

- [Neo4j AuraDB](https://neo4j.com/cloud/platform/aura-graph-database/) free instance
- [Docke Desktop](https://www.docker.com/) installed and running (Docker knowledge not required)
- [Node.js](https://nodejs.org/en/) installed (v16 or higher)

### References

- [Building Neo4j Applications with TypeScript](https://graphacademy.neo4j.com/courses/app-typescript)
- [Testcontainers - Node](https://github.com/testcontainers/testcontainers-node)
- [YouTube - Software testing with Testcontainers Neo4j](https://youtu.be/1Hwv_YEytsE)
