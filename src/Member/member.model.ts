import { Member } from "~/db/entities/Member"
import { IMember } from "./types"

export const addMember = async (data: IMember) => {
  const {
    userName,
    password,
    email,
    avatar,
    gender,
    country,
    title,
    company,
    phoneNumber,
    introduction,
    level,
    fieldOfWork,
  } = data
  const newMember = new Member()
  newMember.userName = userName
  newMember.password = password
  newMember.email = email
  newMember.avatar = avatar
  newMember.gender = gender
  newMember.country = country
  newMember.title = title
  newMember.company = company
  newMember.phoneNumber = phoneNumber
  newMember.introduction = introduction
  newMember.level = level
  newMember.fieldOfWork = fieldOfWork
  return await newMember.save()
}

export const findMemberBy = async ({
  id,
  email,
  userName,
}: {
  id?: string
  email?: string
  userName?: string
}) => {
  return Member.findOne({
    where: [{ id }, { userName }, { email }],
    select: { password: false },
  })
}
