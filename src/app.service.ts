import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RequestCounterMiddleware } from './infrastructure/middleware/RequestCounter.middleware';
import { HealthCheck } from './common/types/HealthCheck.type';

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async getHealthCheck(): Promise<HealthCheck> {
    let dbStatus = 'unknown';
    try {
      await this.dataSource.query('SELECT 1');
      dbStatus = 'up';
    } catch (e) {
      dbStatus = 'down';
    }

    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      requests: RequestCounterMiddleware.getStats(),
      database: dbStatus,
    };
  }
}
