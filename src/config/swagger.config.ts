import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Tech Challenge API - AiqFome')
  .setDescription('API de gerenciamento de clientes e favoritos para o desafio técnico da AiqFome.')
  .setVersion('1.0')
  .build();
