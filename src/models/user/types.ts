export interface IUser {
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
}

export interface IUserSchema {
  id: string
  user_name: string
  email: string
  password: string
  avatar: string
  gender: string
  country: string
  title: string
  company: string
  phone_number: string
  email_otp: boolean
  introduction: string
}
