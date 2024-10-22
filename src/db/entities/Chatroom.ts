import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Member } from "./Member"
import { Mentor } from "./Mentor"
import { Message } from "./Message"

@Index("chatroom_pkey", ["id"], { unique: true })
@Entity("chatroom", { schema: "public" })
export class Chatroom extends BaseEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date

  @ManyToOne(() => Member, (member) => member.chatrooms, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "member_id", referencedColumnName: "id" }])
  member?: Member

  @ManyToOne(() => Mentor, (mentor) => mentor.chatrooms, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "mentor_id", referencedColumnName: "id" }])
  mentor?: Mentor

  @OneToMany(() => Message, (message) => message.chatroom)
  messages?: Message[]
}
