import { Mentor } from "~/db/entities/Mentor"
import { IMentorModel } from "./types"

export const addMentor = async (data: IMentorModel) => {
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
      "experience",
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
      "createdAt",
      "updatedAt",
    ],
    take: count,
    skip: skip,
  })
}
