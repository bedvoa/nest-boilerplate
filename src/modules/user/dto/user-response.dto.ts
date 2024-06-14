export interface IUserResponse {
  uuid?: string;
  status: boolean;
  code: number;
}

export interface IErrorResponse {
  status: boolean;
  code: number;
  message: string;
}
