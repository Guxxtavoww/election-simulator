import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { politicianTypes } from 'src/modules/politician/enums/politician-type.enum';
import { political_ideologies } from 'src/modules/politician/enums/politician-political-ideology.enum';

import { baseColumns } from '../entities/base-columns';

export class Politicians1720474416290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'politicians',
        columns: [
          ...baseColumns,
          {
            name: 'politician_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'politician_photo_url',
            type: 'varchar',
          },
          {
            name: 'corruption_scandals_amount',
            type: 'int',
            default: 0,
          },
          {
            name: 'political_ideology',
            type: 'enum',
            enum: political_ideologies,
          },
          {
            name: 'politician_type',
            type: 'enum',
            enum: politicianTypes,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'votes_amount',
            type: 'int',
            default: 0,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'politicians',
      new TableIndex({
        name: 'IDX_POLITICIAN_NAME',
        columnNames: ['politician_name'],
      }),
    );

    await queryRunner.createIndex(
      'politicians',
      new TableIndex({
        name: 'IDX_POLITICAL_IDEOLOGY',
        columnNames: ['political_ideology'],
      }),
    );

    await queryRunner.createIndex(
      'politicians',
      new TableIndex({
        name: 'IDX_POLITICIAN_TYPE',
        columnNames: ['politician_type'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('politicians', 'IDX_POLITICAL_IDEOLOGY');
    await queryRunner.dropIndex('politicians', 'IDX_POLITICIAN_NAME');
    await queryRunner.dropIndex('politicians', 'IDX_POLITICIAN_TYPE');
    await queryRunner.dropTable('politicians');
  }
}
