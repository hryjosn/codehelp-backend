import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User"

@Index("mentor_info_pkey", ["id"], { unique: true })
@Index("mentor_info_user_id_key", ["userId"], { unique: true })
@Entity("mentor_info", { schema: "public" })
export class MentorInfo {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("uuid", { name: "user_id", nullable: true, unique: true })
  userId: string | null

  @Column("character varying", { name: "years_of_experience", length: 5 })
  yearsOfExperience: string

  @Column("character varying", { name: "linked_url", length: 257 })
  linkedUrl: string

  @Column("character varying", { name: "primary_expertise", length: 100 })
  primaryExpertise: string

  @Column("character varying", {
    name: "secondary_expertise",
    length: 100,
    default: () => "''",
  })
  secondaryExpertise: string

  @Column("character varying", {
    name: "tertiary_expertise",
    length: 100,
    default: () => "''",
  })
  tertiaryExpertise: string

  @Column("jsonb", { name: "disciplines" })
  disciplines: object

  @Column("jsonb", { name: "skills" })
  skills: object

  @Column("jsonb", { name: "tools" })
  tools: object

  @OneToOne(() => User, (user) => user.mentorInfo, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User
}
