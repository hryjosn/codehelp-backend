import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("migrations", { schema: "public" })
export class Migrations extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number

  @Column("bigint", { name: "timestamp" })
  timestamp?: string

  @Column("character varying", { name: "name" })
  name?: string
}
