import { MentorInfo } from "../entities/MentorInfo"
import { User } from "../entities/User"
import { MemberInfo } from "../entities/MemberInfo"
import { IUserData } from "./types"
export default class UserModel {
  async addOne(params: IUserData) {
    const {
      userName,
      password,
      avatar,
      email,
      phoneNumber,
      introduction,
      title,
      company,
      gender,
      country,
      mentorInfo,
      memberInfo,
    } = params

    const newUser = new User()
    newUser.user_name = userName
    newUser.password = password
    newUser.email = email
    newUser.avatar = avatar
    newUser.phone_number = phoneNumber
    newUser.introduction = introduction
    newUser.title = title
    newUser.company = company
    newUser.gender = gender
    newUser.country = country
    const newUserData = await newUser.save()
    if (mentorInfo) {
      const newMentor = new MentorInfo()
      newMentor.user = newUser
      newMentor.years_of_experience = mentorInfo.yearsOfExperience
      newMentor.linked_url = mentorInfo.linkedURL
      newMentor.primary_expertise = mentorInfo.primaryExpertise
      newMentor.secondary_expertise = mentorInfo.secondaryExpertise
      newMentor.tertiary_expertise = mentorInfo.tertiaryExpertise
      newMentor.disciplines = mentorInfo.disciplines
      newMentor.skills = mentorInfo.skills
      newMentor.tools = mentorInfo.tools
      await newMentor.save()
    } else {
      const newMember = new MemberInfo()
      newMember.user = newUser
      newMember.level_of_experience = memberInfo!.levelOfExperience
      newMember.field_of_work = memberInfo!.fieldOfWork
      await newMember.save()
    }
    return newUserData
  }

  findOne({ userName, email }: { userName?: string; email?: string }) {
    return User.findOne({
      where: [{ user_name: userName }, { email }],
    })
  }
}
