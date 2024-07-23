import client from "~/db/dbConfig"

export const findOneWithMentorInfoBy = async ({ id }: { id: string }) => {
  const result = await client.query({
    text: `
            SELECT * FROM "user" u
              LEFT JOIN mentor_info ON u.id = mentor_info.user_id
            WHERE u.id = $1;
        `,
    values: [id],
  })
  return result.rows[0]
}
