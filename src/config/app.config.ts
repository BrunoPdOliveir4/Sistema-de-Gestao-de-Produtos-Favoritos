export const appConfig = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASS ?? 'postgres',
    name: process.env.DB_NAME ?? 'aiqfome',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'changeme',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1h',
  },
});
