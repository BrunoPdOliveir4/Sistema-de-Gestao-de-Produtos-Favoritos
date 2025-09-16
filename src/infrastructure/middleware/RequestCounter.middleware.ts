import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestCounterMiddleware implements NestMiddleware {
  private static requests = 0;
  private static startedAt = Date.now();

  use(req: Request, res: Response, next: NextFunction) {
    RequestCounterMiddleware.requests++;
    next();
  }

  static getStats() {
    const uptimeSeconds = (Date.now() - this.startedAt) / 1000;
    const rps = this.requests / (uptimeSeconds || 1);
    return {
      totalRequests: this.requests,
      requestsPerSecond: rps.toFixed(2),
    };
  }
}
