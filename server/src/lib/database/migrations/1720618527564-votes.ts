import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

import { politicianTypes } from 'src/modules/politician/enums/politician-type.enum';

import { baseColumns } from '../entities/base-columns';

export class Votes1720618527564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'votes',
        columns: [
          ...baseColumns,
          {
            name: 'voter_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'politician_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'politician_type',
            type: 'enum',
            enum: politicianTypes,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'votes',
      new TableIndex({
        name: 'IDX_VOTES_VOTER_ID',
        columnNames: ['voter_id'],
      }),
    );

    await queryRunner.createIndex(
      'votes',
      new TableIndex({
        name: 'IDX_VOTES_POLITICIAN_ID',
        columnNames: ['politician_id'],
      }),
    );

    await queryRunner.createIndex(
      'votes',
      new TableIndex({
        name: 'IDX_VOTES_POLITICIAN_TYPE',
        columnNames: ['politician_type'],
      }),
    );

    await queryRunner.createForeignKey(
      'votes',
      new TableForeignKey({
        columnNames: ['voter_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'votes',
      new TableForeignKey({
        columnNames: ['politician_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'politicians',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = (await queryRunner.getTable('votes')) as Table;

    const voterForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('voter_id') !== -1,
    ) as TableForeignKey;

    await queryRunner.dropForeignKey('votes', voterForeignKey);

    const politicianForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('politician_id') !== -1,
    ) as TableForeignKey;

    await queryRunner.dropForeignKey('votes', politicianForeignKey);

    await queryRunner.dropIndex('votes', 'IDX_VOTES_VOTER_ID');
    await queryRunner.dropIndex('votes', 'IDX_VOTES_POLITICIAN_TYPE');
    await queryRunner.dropIndex('votes', 'IDX_VOTES_POLITICIAN_ID');
    
    await queryRunner.dropTable('votes');
  }
}
