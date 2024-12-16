import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm"
import { Member } from "./Member"
import { Mentor } from "./Mentor"

@Index("booking_pkey", ["id"], { unique: true })
@Entity("booking", { schema: "public" })
export class Booking extends BaseEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string

  @Column("text", { name: "problem" })
  problem?: string

  @Column("smallint", { name: "booking_status", default: () => "0" })
  bookingStatus?: number

  @Column("timestamp without time zone", { name: "booking_at" })
  bookingAt?: Date

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date

  @ManyToOne(() => Member, (member) => member.bookings, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "member_id", referencedColumnName: "id" }])
  member?: Member

  @ManyToOne(() => Mentor, (mentor) => mentor.bookings, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "mentor_id", referencedColumnName: "id" }])
  mentor?: Mentor
}
