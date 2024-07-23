import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
          ALTER TABLE member_info
          ADD CONSTRAINT fk_member_info_user
              FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
    `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
          ALTER TABLE member_info DROP CONSTRAINT fk_member_info_user;      
    `)
}
