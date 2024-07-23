import jwt from "jsonwebtoken"
import { IUserSchema } from "~/models/user/types"

export const generateToken = (user: IUserSchema) => {
  return (
    "Bearer " +
    jwt.sign(
      { user_name: user.user_name, email: user.email, _id: user.id },
      String(process.env.TOKEN),
      { expiresIn: "30 day" },
    )
  )
}
