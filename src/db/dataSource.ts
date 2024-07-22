import "dotenv/config"
import { DataSource } from "typeorm"

export default new DataSource({
  type: "postgres",
  name: process.env.DB_USER,
  url: process.env.DB_URL,
  database: process.env.DB,
  password: process.env.DB_PWD,
  port: 5432,
  synchronize: false,
  entities: [console.log(__dirname) + "/entities/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  migrationsTableName: "migration",
  extra: {
    max: 1,
  },
})
