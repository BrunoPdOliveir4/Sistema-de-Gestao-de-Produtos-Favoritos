import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DatabaseSeedService } from './SeedService';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  const seeder = appContext.get(DatabaseSeedService);
  await seeder.run();

  await appContext.close();
}
bootstrap().catch((err) => {
  console.error('Seed failed', err);
  process.exit(1);
});
