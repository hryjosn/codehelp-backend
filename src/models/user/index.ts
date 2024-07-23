import client from "../../db/dbConfig"
import { findOneWithMemberInfoBy } from "../memberInfo"
import { IUserWithMemberInfo } from "../memberInfo/types"
import { findOneWithMentorInfoBy } from "../mentorInfo"
import { IUserWithMentorInfo } from "../mentorInfo/types"
import { IUser } from "./types"

const addNewUser = async ({
  userName,
  email,
  password,
  avatar,
  gender,
  country,
  title,
  company,
  phoneNumber,
  introduction,
}: IUser) => {
  return await client.query({
    text: `
        INSERT INTO "user" (
          user_name,
          email,
          password,
          avatar,
          gender,
          country,
          title,
          company,
          phone_number,
          introduction
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `,
    values: [
      userName,
      email,
      password,
      avatar,
      gender,
      country,
      title,
      company,
      phoneNumber,
      introduction,
    ],
  })
}

export const addMember = async ({
  userName,
  email,
  password,
  avatar,
  gender,
  country,
  title,
  company,
  phoneNumber,
  introduction,
  levelOfExperience,
  fieldOfWork,
}: IUserWithMemberInfo) => {
  try {
    await client.query("BEGIN")
    const newUser = await addNewUser({
      userName,
      email,
      password,
      avatar,
      gender,
      country,
      title,
      company,
      phoneNumber,
      introduction,
    })

    await client.query({
      text: `
          INSERT INTO member_info (user_id, level_of_experience, field_of_work) VALUES ($1, $2, $3);
      `,
      values: [
        newUser.rows[0].id,
        levelOfExperience,
        JSON.stringify(fieldOfWork),
      ],
    })

    const result = await findOneWithMemberInfoBy({ id: newUser.rows[0].id })
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  }
}

export const addMentor = async ({
  userName,
  email,
  password,
  avatar,
  gender,
  country,
  title,
  company,
  phoneNumber,
  introduction,
  yearsOfExperience,
  linkedURL,
  primaryExpertise,
  secondaryExpertise,
  tertiaryExpertise,
  disciplines,
  skills,
  tools,
}: IUserWithMentorInfo) => {
  try {
    await client.query("BEGIN")
    const newUser = await addNewUser({
      userName,
      email,
      password,
      avatar,
      gender,
      country,
      title,
      company,
      phoneNumber,
      introduction,
    })

    await client.query({
      text: `
          INSERT INTO mentor_info (
            user_id,
            years_of_experience,
            linked_url,
            primary_expertise,
            secondary_expertise,
            tertiary_expertise,
            disciplines,
            skills,
            tools
          ) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
      `,
      values: [
        newUser.rows[0].id,
        yearsOfExperience,
        linkedURL,
        primaryExpertise,
        secondaryExpertise,
        tertiaryExpertise,
        JSON.stringify(disciplines),
        JSON.stringify(skills),
        JSON.stringify(tools),
      ],
    })

    const result = await findOneWithMentorInfoBy({ id: newUser.rows[0].id })
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  }
}

export const findOneBy = async ({
  email,
  id,
}: {
  email?: string
  id?: string
}) => {
  const result = await client.query({
    text: `
        SELECT * FROM "user" where id = $1 OR email = $2;
    `,
    values: [id, email],
  })
  return result.rows[0]
}
