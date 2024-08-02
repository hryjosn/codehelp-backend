import fs from "node:fs"

const readSQLFile = (fileName: string) => {
  const folderPath = __dirname.replace("\\utils", "")
  const filePath = folderPath + `/tables/${fileName}.sql`
  const sqlFile = fs.readFileSync(filePath, "utf8")
  return sqlFile
}

export default readSQLFile
