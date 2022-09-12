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
# List all users.
query {
  users {
    id, firstName, lastName, email, password
  }
}
```

```bash
# Response:
{
  "data": {
    "users": []
  }
}
```

```bash
# Create a new user.
mutation {
  createUser(input: {
    firstName: "Linus",
    lastName: "Torvalds",
    email: "linux@linux.com",
    password: "password@123"
  }) {
    id, firstName, lastName, email
  }
}
```

```bash
# Response:
{
  "data": {
    "createUser": {
      "id": "1",
      "firstName": "Linus",
      "lastName": "Torvalds",
      "email": "linux@linux.com",
      "password": "password@123"
    }
  }
}
```

```bash
# List a user by ID.
query {
  user(id: 1) {
    id, email, firstName, lastName, password
  }
}
```

```bash
# Response:
{
  "data": {
    "user": {
      "id": "1",
      "email": "linux@linux.com",
      "firstName": "Linus",
      "lastName": "Torvalds",
      "password": "$2b$10$ng8wZp69iGNJuctTaVRVgeE9KUWZug0ATRjB5/46IkyxcX8tDzt2a"
    }
  }
}
```

```bash
# Update a user by ID.
mutation {
  updateUserById(id: 1, input: {
    email: "linux@domain.com",
  }) {
    id, email, firstName, lastName
  }
}
```

```bash
# Response:
{
  "data": {
    "updateUserById": {
      "id": "1",
      "email": "linux@domain.com",
      "firstName": "Linus",
      "lastName": "Torvalds"
    }
  }
}
```

```bash
# Delete a user by ID.
mutation {
  deleteUserById(id: 2)
}
```

```bash
# Response:
{
  "data": {
    "deleteUserById": true
  }
}
```

## Test

```bash
# Run unit tests.
$ yarn test

# Run test coverage.
$ yarn test:cov
