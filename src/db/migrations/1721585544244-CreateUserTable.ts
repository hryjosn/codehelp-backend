import { MigrationInterface, QueryRunner } from "typeorm"
import createUserTableQueryString from "../tables/user"

export class CreateUserTable1721585544244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(createUserTableQueryString)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
