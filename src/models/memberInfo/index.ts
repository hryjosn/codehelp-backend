import client from "~/db/dbConfig"

export const findOneWithMemberInfoBy = async ({ id }: { id: string }) => {
  const result = await client.query({
    text: `
          SELECT * FROM "user" u
            LEFT JOIN member_info ON u.id = member_info.user_id
          WHERE u.id = $1;
      `,
    values: [id],
  })
  return result.rows[0]
}
