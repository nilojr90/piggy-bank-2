import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategory1595188936081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name:'categories',
        columns:[
          {
            name:'id',
            type:'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default:"'uuid_generate_v4'",
          },
          {
            name:'title',
            type:'varchar',
          },
          {
            name:'created_at',
            type:'timestamp with time zone',
          },
          {
            name:'updated_at',
            type:'timestamp with time zone',
          },
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('categories');
    }

}
