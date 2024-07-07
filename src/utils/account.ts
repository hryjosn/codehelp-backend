import jwt from "jsonwebtoken"
import { User } from "../entities/User"

export const generateToken = (user: User) => {
  return (
    "Bearer " +
    jwt.sign(
      { user_name: user.user_name, email: user.email, _id: user.id },
      String(process.env.TOKEN),
      { expiresIn: "30 day" },
    )
  )
}
