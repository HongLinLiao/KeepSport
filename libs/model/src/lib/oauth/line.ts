export interface GetOAuthTokenBody {
  grant_type: string;
  code: string;
  redirect_uri: string;
  client_id: string;
  client_secret: string;
  code_verifier?: string;
}

export interface GetOAuthTokenResponse {
  access_token: string;
  expires_in: number;
  id_token?: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface ValidOAuthTokenResponse {
  scope: string;
  client_id: number;
  expires_in: number;
}

export interface RefreshOAuthTokenBody {
  grant_type: string;
  refresh_token: string;
  client_id: string;
  client_secret: string;
}

export interface RevokeOAuthTokenBody {
  access_token: string;
  client_id: string;
  client_secret: string;
}

export interface GetUserProfileResponse {
  userId: string;
  displayName: string;
  pictureUrl: string;
  statusMessage: string;
}
