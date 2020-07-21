import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateTransactions1594853553950 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name:'transactions',
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
                name:'type',
                type:'varchar',
              },
              {
                name:'value',
                type:'decimal',
                precision: 10,
                scale: 2,
              },
              {
                name:'category_id',
                type:'varchar',
                isNullable: true,
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
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('transactions');
    }

}
