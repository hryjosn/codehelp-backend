import { RESPONSE_CODE } from "~/types"

export default class HttpError extends Error {
  constructor(
    public code: RESPONSE_CODE,
    public message: string,
  ) {
    super()
  }
}
