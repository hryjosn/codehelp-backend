import { DataSource } from "typeorm"
import testDataSource from "~/db/testDataSource"

export class DataBase {
  private dataSource: DataSource

  async setup() {
    try {
      this.dataSource = testDataSource
      await this.dataSource.initialize()
      console.log(`Database ${process.env.DB} connection established.`)
    } catch (error) {
      console.log("setup error", error)
    }
  }

  destroy() {
    this.dataSource.destroy()
  }
}
