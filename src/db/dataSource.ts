import "dotenv/config"
import { DataSource } from "typeorm"

const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: false,
  entities: [__dirname + "/entities/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  extra: {
    max: 1,
  },
})

export default dataSource
