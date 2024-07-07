import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { MentorInfo } from "./MentorInfo"
import { MemberInfo } from "./memberInfo"

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { length: 100, nullable: false })
  password?: string

  @Column("varchar", { length: 30, nullable: false })
  user_name: string

  @Column("varchar", { length: 254, nullable: false, unique: true })
  email: string

  @OneToOne(() => MentorInfo, (mentor_info) => mentor_info.user)
  @JoinColumn()
  mentor_info: MentorInfo

  @OneToOne(() => MemberInfo, (member_info) => member_info.user)
  @JoinColumn()
  member_info: MemberInfo

  @Column("varchar", { length: 150, nullable: false })
  avatar: string

  @Column("varchar", { length: 30, nullable: false })
  gender: string

  @Column("varchar", { length: 30, nullable: false })
  country: string

  @Column("varchar", { length: 100, nullable: false })
  title: string

  @Column("varchar", { length: 100, nullable: false })
  company: string

  @Column("varchar", { length: 20, default: "" })
  phone_number: string

  @Column({ default: false })
  emailOTP: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  toJSON() {
    delete this.password
    return this
  }
}
