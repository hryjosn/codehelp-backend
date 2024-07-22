import { MigrationInterface, QueryRunner } from "typeorm"

export class OneToOneBetweenUserAndMentorInfo1721657929375
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE mentor_info
            ADD CONSTRAINT fk_mentor_info_user
                FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE;

            ALTER TABLE "user"
            ADD CONSTRAINT fk_user_mentor_info
                FOREIGN KEY (id) REFERENCES mentor_info (user_id);   
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT fk_user_mentor_info;
            ALTER TABLE mentor_info DROP CONSTRAINT fk_mentor_info_user;
        `)
  }
}
