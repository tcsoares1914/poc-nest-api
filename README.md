## Nest + GraphQL

Basic GraphQL API with NestJS

## Config and run
  - [Stack](#stack)
  - [Installation](#installation)
  - [Running](#running)
  - [Test](#tests)

### Stack <a name="stack"></a>

* [GraphQL](https://graphql.org/)
* [TypeScript](https://github.com/nestjs/nest)
* [NestJS](https://github.com/nestjs/nest)
* [TypeORM](https://typeorm.io/)
* [SQLite](https://www.sqlite.org/)
* [Jest](https://jestjs.io/)

### Installation <a name="installation"></a>

Clone repository

```bash
# Using HTTPS method.
$ git clone https://github.com/tcsoares84/poc-nest-api.git

# Using SSL method.
$ git@github.com:tcsoares84/poc-nest-api.git
```

### Running <a name="running"></a>

Make shure you have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

```bash
# Start application containers.
$ docker-compose up -d
```

Run GraphQL playground.

```bash
http://localhost:4000/graphql
```

### Test <a name="tests"></a>

```bash
# Run unit tests.
$ yarn test

# Run test coverage.
$ yarn test:cov

# Run e2e tests.
$ yarn test:e2e
