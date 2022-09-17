import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  get() {
    return {
      healthy: true,
      name: 'Skeleton',
      version: process.env.npm_package_version,
    };
  }
}
