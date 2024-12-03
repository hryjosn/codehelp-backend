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
    education,
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
  newMentor.education = education
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

export const findManyAndCount = async ({
  count,
  skip,
  keyword,
}: {
  count: number
  skip: number
  keyword?: string
}) => {
  return Mentor.createQueryBuilder("mentor")
    .where("mentor.user_name ILIKE COALESCE(:keyword, '%')", {
      keyword: keyword && `%${keyword}%`,
    })
    .select([
      "mentor.id",
      "mentor.userName",
      "mentor.avatar",
      "mentor.email",
      "mentor.gender",
      "mentor.country",
      "mentor.title",
      "mentor.company",
      "mentor.phoneNumber",
      "mentor.introduction",
      "mentor.level",
      "mentor.url",
      "mentor.primaryExpertise",
      "mentor.secondaryExpertise",
      "mentor.tertiaryExpertise",
      "mentor.disciplines",
      "mentor.skills",
      "mentor.tools",
      "mentor.createdAt",
      "mentor.updatedAt",
      "mentor.quickReply",
      "mentor.experience",
    ])
    .take(count)
    .skip(skip)
    .getManyAndCount()
}
