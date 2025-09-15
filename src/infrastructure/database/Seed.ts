import { Injectable } from '@nestjs/common';
import { QueryRunner, DataSource } from 'typeorm';

@Injectable()
export class DatabaseSeedService {
  constructor(private dataSource: DataSource) {}

  async run() {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    const clientTableExists = await queryRunner.hasTable("client");
    if(clientTableExists){
        await queryRunner.manager.query(`
            INSERT INTO client VALUES(id, name, email, role, created_at) VALUES
                (1, administrador, admin@admin.test, NOW())           
            `)
    }
    
    const serviceTableExists = await queryRunner.hasTable("service");
    if(serviceTableExists){
        await queryRunner.manager.query(`
            INSERT INTO service(id, name, url, created_at) VALUES
                (1, default, https://fakestoreapi.com/products, NOW())
            `)
    }


    await queryRunner.release();
  }
}