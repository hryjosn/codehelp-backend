import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./User"

@Entity("member_info")
export class MemberInfo extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => User, (user) => user.member_info)
  user: User

  @Column("varchar", { length: 30, nullable: false })
  level_of_experience: string

  @Column("jsonb", { nullable: false })
  field_of_work: string[]
}
