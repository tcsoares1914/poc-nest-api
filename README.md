## Nest + GraphQL

POC using NestJS + GraphQL + TypeORM + SQLite.

## Stack

* [GraphQL](https://graphql.org/)
* [NestJS](https://github.com/nestjs/nest)
* [TypeScript](https://github.com/nestjs/nest)
* [TypeORM](https://typeorm.io/)
* [SQLite](https://www.sqlite.org/)
* [Jest](https://jestjs.io/)

## Installation

Clone repository

```bash
# Using HTTPS method.
$ git clone https://github.com/tcsoares84/poc-nest-graphql.git

# Using SSL method.
$ git@github.com:tcsoares84/poc-nest-graphql.git
```

## Running

Make shure you have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

```bash
# Start application containers.
$ docker-compose up -d
```

After Docker launch the application containers you need to install application dependencies with [Yarn](https://classic.yarnpkg.com/en/docs/usage).

```bash
# Enter into containner.
$ docker exec -it poc-nest-graphql bash

# Install application dependencies.
$ yarn install
```

Run GraphQL playground.

```bash
http://localhost:4000/graphql
```

Perform some queries:

```bash
# List all droids.
query {
  droids {
    id, name
  }
}
```

```bash
# Response:
{
  "data": {
    "droids": []
  }
}
```

```bash
# Create a new droid.
mutation {
  createDroid(input: { name: "R5-J2" }) {
    id, name
  }
}
```

```bash
# Response:
{
  "data": {
    "createDroid": {
      "id": "4",
      "name": "R5-J2"
    }
  }
}
```

```bash
# List a droid by ID.
query {
  droid(id: 3) {
    id,name
  }
}
```

```bash
# Response:
{
  "data": {
    "droid": {
      "id": "3",
      "name": "BB-8"
    }
  }
}
```

```bash
# Update a droid by ID.
mutation {
  updateDroidById(id: 4, input: { name: "R5-J2" }) {
    id, name
  }
}

```

```bash
# Response:
{
  "data": {
    "updateDroidById": {
      "id": "4",
      "name": "R5-J2"
    }
  }
}
```

```bash
# Delete a droid by ID.
mutation {
  deleteDroidByID(id: 4)
}
```

```bash
# Response:
{
  "data": {
    "deleteDroidByID": true
  }
}
```

## Test

```bash
# Run unit tests.
$ yarn test

# Run test coverage.
$ yarn test:cov
