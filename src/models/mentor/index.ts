import { Mentor } from "~/db/entities/Mentor"
import { IMentor } from "./types"

export const addMentor = async (data: IMentor) => {
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
    linkedInURL,
    primaryExpertise,
    secondaryExpertise,
    tertiaryExpertise,
    disciplines,
    skills,
    tools,
  } = data
  const newMentor = new Mentor()
  newMentor.userName = userName
  newMentor.password = password
  newMentor.email = email
  newMentor.avatar = avatar
  newMentor.gender = gender
  newMentor.country = country
  newMentor.title = title
  newMentor.company = company
  newMentor.phoneNumber = phoneNumber
  newMentor.introduction = introduction
  newMentor.level = level
  newMentor.url = linkedInURL
  newMentor.primaryExpertise = primaryExpertise
  newMentor.secondaryExpertise = secondaryExpertise
  newMentor.tertiaryExpertise = tertiaryExpertise
  newMentor.disciplines = disciplines
  newMentor.skills = skills
  newMentor.tools = tools
  return await newMentor.save()
}

export const findMentorBy = async ({
  id,
  email,
  userName,
}: {
  id?: string
  email?: string
  userName?: string
}) => {
  return Mentor.findOne({
    where: [{ id }, { userName }, { email }],
    select: [
      "id",
      "userName",
      "email",
      "avatar",
      "gender",
      "country",
      "title",
      "company",
      "phoneNumber",
      "emailOtp",
      "introduction",
      "level",
      "url",
      "primaryExpertise",
      "secondaryExpertise",
      "tertiaryExpertise",
      "disciplines",
      "skills",
      "tools",
    ],
  })
}

export const findMany = ({ count, skip }: { count: number; skip: number }) => {
  return Mentor.findAndCount({
    select: [
      "id",
      "userName",
      "email",
      "avatar",
      "gender",
      "country",
      "title",
      "company",
      "phoneNumber",
      "emailOtp",
      "introduction",
      "level",
      "url",
      "primaryExpertise",
      "secondaryExpertise",
      "tertiaryExpertise",
      "disciplines",
      "skills",
      "tools",
    ],
    take: count,
    skip: skip,
  })
}
