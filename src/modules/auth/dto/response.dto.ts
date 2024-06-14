export interface IAuthResponseDto {
  accessToken: string;
  refreshToken: string;
  userInfo?: {
    email?: string;
    userId?: string;
    nickname?: string;
    name?: string;
    status?: boolean;
  };
}
