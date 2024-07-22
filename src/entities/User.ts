import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm"
import { MentorInfo } from "./MentorInfo"

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string

  @Column("character varying", { name: "user_name", length: 30 })
  userName: string

  @Column("character varying", { name: "email", unique: true, length: 254 })
  email: string

  @Column("character varying", { name: "password", length: 100 })
  password: string

  @Column("character varying", { name: "avatar", length: 150 })
  avatar: string

  @Column("character varying", { name: "gender", length: 30 })
  gender: string

  @Column("character varying", { name: "country", length: 30 })
  country: string

  @Column("character varying", { name: "title", length: 100 })
  title: string

  @Column("character varying", { name: "company", length: 100 })
  company: string

  @Column("character varying", { name: "phone_number", length: 20 })
  phoneNumber: string

  @Column("boolean", { name: "email_otp", default: () => "false" })
  emailOtp: boolean

  @Column("character varying", { name: "introduction", length: 500 })
  introduction: string

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "LOCALTIMESTAMP",
  })
  createdAt: Date

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "LOCALTIMESTAMP",
  })
  updatedAt: Date

  @OneToOne(() => MentorInfo, (mentorInfo) => mentorInfo.user)
  mentorInfo: MentorInfo
}
