export enum RESPONSE_CODE {
  VALIDATE_ERROR = "4001",
  USER_DATA_ERROR = "4002",
  DATA_DUPLICATE = "4003",
  TARGET_NOT_EXISTS = "4004",
  NO_PERMISSION = "4005",
  UNKNOWN_ERROR = "5000",
}

export enum GENDER {
  "MALE" = "m",
  "FEMALE" = "f",
  "UNKNOWN" = "n",
}

export interface IAccount {
  email: string
  password: string
}
