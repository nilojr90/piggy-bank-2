import {MigrationInterface, QueryRunner,TableForeignKey, TableColumn} from "typeorm";

export class RelationTransactionCategory1595371593132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

      await queryRunner.createForeignKey('transactions', new TableForeignKey({
          name: 'fk-transaction-category',
          columnNames: ['category_id'],
          referencedColumnNames:['id'],
          referencedTableName:'categories',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
          }
        )
      );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

      await queryRunner.dropForeignKey('transactions','fk-transaction-category');
    }

}
