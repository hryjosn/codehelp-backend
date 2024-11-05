import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm"
import { Chatroom } from "./Chatroom"

@Index("message_pkey", ["id"], { unique: true })
@Entity("message", { schema: "public" })
export class Message extends BaseEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id?: string

  @Column("uuid", { name: "user_id" })
  userId?: string

  @Column("text", { name: "content" })
  content?: string

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "chatroom_id", referencedColumnName: "id" }])
  chatroom?: Chatroom
}
