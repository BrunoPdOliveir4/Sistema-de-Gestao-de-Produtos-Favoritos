export type HealthCheck = {
  status: string;
  uptime: number;
  timestamp: string;
  requests: {
    totalRequests: number;
    requestsPerSecond: string;
  };
  database: string;
};
