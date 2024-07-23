import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate"

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        ALTER TABLE mentor_info
        ADD CONSTRAINT fk_mentor_info_user
            FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
  `)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        ALTER TABLE mentor_info DROP CONSTRAINT fk_mentor_info_user;      
  `)
}
