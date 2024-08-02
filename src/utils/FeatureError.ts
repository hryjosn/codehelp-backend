import { RESPONSE_CODE } from "~/types"

export default class FeatureError extends Error {
  constructor(
    public serverStatus: number,
    public code: RESPONSE_CODE,
    public message: string,
  ) {
    super()
  }
}
