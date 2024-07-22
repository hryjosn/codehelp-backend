import { MigrationInterface, QueryRunner } from "typeorm"
import createMentorInfoTableQueryString from "../tables/mentor_info"

export class CreateMentorInfoTable1721656157071 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(createMentorInfoTableQueryString)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE mentor_info
        `)
  }
}
