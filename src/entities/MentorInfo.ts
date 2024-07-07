import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./User"

@Entity("mentor_info")
export class MentorInfo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => User, (user) => user.mentor_info)
  user: User

  @Column("varchar", { length: 5, nullable: false })
  years_of_experience: string

  @Column("varchar", { length: 257, nullable: false })
  linked: string

  @Column("varchar", { length: 100, nullable: false })
  primary_expertise: string

  @Column("varchar", { length: 100, nullable: false, default: "" })
  secondary_expertise: string

  @Column("varchar", { length: 100, nullable: false, default: "" })
  tertiary_expertise: string

  @Column("jsonb", { nullable: false })
  disciplines: string[]

  @Column("jsonb", { nullable: false })
  skills: string[]

  @Column("jsonb", { nullable: false })
  lines: string[]
}
