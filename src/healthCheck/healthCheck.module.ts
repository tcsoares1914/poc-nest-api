import { Module } from '@nestjs/common';
import { HealthCheckService } from './healthCheck.service';
import { HealthCheckController } from './healthCheck.controller';

@Module({
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
