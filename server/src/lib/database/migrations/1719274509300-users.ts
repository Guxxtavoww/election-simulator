import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { baseColumns } from '../entities/base-columns';

export class Users1719274509300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          ...baseColumns,
          {
            name: 'user_name',
            type: 'varchar',
          },
          {
            name: 'hashed_password',
            type: 'varchar',
          },
          {
            name: 'user_email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_cpf_number',
            type: 'varchar',
            isUnique: true
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_NAME',
        columnNames: ['user_name'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['user_email'],
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_PHONE_NUMBER',
        columnNames: ['phone_number'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_CPF_NUMBER',
        columnNames: ['user_cpf_number'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USER_NAME');
    await queryRunner.dropIndex('users', 'IDX_USER_EMAIL');
    await queryRunner.dropIndex('users', 'IDX_PHONE_NUMBER');
    await queryRunner.dropIndex('users', 'IDX_USER_CPF_NUMBER');
    await queryRunner.dropTable('users');
  }
}
