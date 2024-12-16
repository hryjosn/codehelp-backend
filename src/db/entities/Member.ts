import { BaseEntity, Column, Entity, Index, OneToMany } from "typeorm"
import { Booking } from "./Booking"
import { Chatroom } from "./Chatroom"

@Index("member_email_key", ["email"], { unique: true })
@Index("member_pkey", ["id"], { unique: true })
@Entity("member", { schema: "public" })
export class Member extends BaseEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string

  @Column("character varying", { name: "user_name", length: 30 })
  userName?: string

  @Column("text", { name: "email", unique: true })
  email?: string

  @Column("character varying", { name: "password", length: 72 })
  password?: string

  @Column("text", { name: "avatar" })
  avatar?: string

  @Column("character", { name: "gender", length: 1 })
  gender?: string

  @Column("character", { name: "country", length: 2 })
  country?: string

  @Column("character varying", { name: "title", length: 100 })
  title?: string

  @Column("character varying", { name: "company", length: 100 })
  company?: string

  @Column("character", { name: "phone_number", length: 20 })
  phoneNumber?: string

  @Column("boolean", { name: "email_otp", default: () => "false" })
  emailOtp?: boolean

  @Column("text", { name: "introduction" })
  introduction?: string

  @Column("smallint", { name: "level" })
  level?: number

  @Column("jsonb", { name: "field_of_work" })
  fieldOfWork?: object

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt?: Date

  @OneToMany(() => Booking, (booking) => booking.member)
  bookings?: Booking[]

  @OneToMany(() => Chatroom, (chatroom) => chatroom.member)
  chatrooms?: Chatroom[]
}
