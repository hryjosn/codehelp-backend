export interface IMentor {
  userName: string
  email: string
  password: string
  avatar: string
  gender: string
  country: string
  title: string
  company: string
  phoneNumber: string
  emailOtp?: boolean
  introduction: string
  yearsOfExperience: string
  linkedURL: string
  primaryExpertise: string
  secondaryExpertise?: string
  tertiaryExpertise?: string
  disciplines: string[]
  skills: string[]
  tools: string[]
}
