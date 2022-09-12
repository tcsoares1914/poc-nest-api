import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'

const ormConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['dist/**/*.entity{.js, .ts}'],
  synchronize: process.env.DATABASE_SYNC == 'true',
  migrations: ['dist/src/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
}

export default ormConfig
