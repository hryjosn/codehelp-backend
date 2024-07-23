import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate"
import readSQLFile from "../utils/readSQLFile"
export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(readSQLFile("user"))
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(`
        DROP TABLE "user";
  `)
}
