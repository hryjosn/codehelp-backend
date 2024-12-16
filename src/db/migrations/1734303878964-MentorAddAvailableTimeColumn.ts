import { MigrationInterface, QueryRunner } from "typeorm"

export class MentorAddAvailableTimeColumn1734303878964
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE mentor
            ADD available_time JSONB DEFAULT '[]'::JSONB NOT NULL;

            COMMENT ON COLUMN mentor.available_time IS 'Mentor available time for booking';
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE mentor
            DROP COLUMN available_time;
        `)
  }
}
