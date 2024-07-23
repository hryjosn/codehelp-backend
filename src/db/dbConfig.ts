import "dotenv/config"
import pg from "pg"
const { Client } = pg

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB,
})

export default client
