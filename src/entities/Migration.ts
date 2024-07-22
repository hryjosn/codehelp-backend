import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("migration", { schema: "public" })
export class Migration {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("bigint", { name: "timestamp" })
  timestamp: string;

  @Column("character varying", { name: "name" })
  name: string;
}
