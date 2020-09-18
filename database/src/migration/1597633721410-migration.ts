import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1597633721410 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "categoria_entity" RENAME COLUMN "id" TO "value"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "categoria_entity" RENAME COLUMN "value" TO "id"`);
    }
}
