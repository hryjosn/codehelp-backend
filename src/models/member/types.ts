export interface IMember {
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
  level: LEVEL_OF_EXPERIENCE
  fieldOfWork: string[]
}

export enum LEVEL_OF_EXPERIENCE {
  Intermediate = 0,
  Senior = 1,
  Manager = 2,
  Director = 3,
  Lead = 4,
  Executive = 5,
  Founder = 6,
}

export enum GENDER {
  MALE = "m",
  FEMALE = "f",
  UNKNOWN = "n",
}
