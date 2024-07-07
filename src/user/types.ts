export interface IUserData {
  userName: string
  password: string
  email: string
  avatar: string
  gender: string
  country: string
  title: string
  company: string
  introduction: string
  phoneNumber: string
  mentorInfo?: IMentor
  memberInfo?: IMember
}

export interface IMentor {
  yearsOfExperience: string
  linkedURL: string
  primaryExpertise: string
  secondaryExpertise: string
  tertiaryExpertise: string
  disciplines: string[]
  skills: string[]
  tools: string[]
}

export interface IMember {
  levelOfExperience: string
  fieldOfWork: string[]
}
