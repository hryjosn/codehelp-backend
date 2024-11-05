import path from "path"
import { DataSource } from "typeorm"

const testDataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: false,
  migrationsRun: true,
  dropSchema: true,
  entities: [path.join(__dirname, "/entities/*{.ts,.js}")],
  migrations: [path.join(__dirname, "/migrations/*{.ts,.js}")],
  extra: {
    max: 1,
  },
})

export default testDataSource
