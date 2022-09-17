import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import graphqlConfig from './config/graphql.config';
import ormConfig from './config/orm/sqlite.config';
import { HealthCheckModule } from './healthCheck/healthCheck.module';
import { UserModule } from './user/user.module';

const importedModules = [HealthCheckModule, UserModule];

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot(graphqlConfig),
    TypeOrmModule.forRoot(ormConfig),
    ...importedModules,
  ],
})
export class AppModule {}
