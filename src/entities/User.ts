import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar", { length: 100 })
  password?: string

  @Column("varchar", { length: 30 })
  user_name: string

  @Column("varchar", { length: 254, default: "" })
  email: string

  @Column("varchar", { length: 150 })
  avatar: string

  @Column("varchar", { length: 20 })
  phoneNumber: string

  @Column({ default: false })
  verify: boolean

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
