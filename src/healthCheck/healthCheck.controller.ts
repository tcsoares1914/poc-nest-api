import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './healthCheck.service';

@Controller('/')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  get() {
    return this.healthCheckService.get();
  }
}
