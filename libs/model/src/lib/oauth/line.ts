export interface GetLINEOAuthTokenBody {
  code: string;
  state: string;
}

export interface GetLINEOAuthTokenResponse {
  access_token: string;
  expires_in: number;
  id_token?: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
