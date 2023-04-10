export interface LINEOAuth {
  access_token: string;
  expires_in: number;
  id_token?: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface VerifyLINEOAuth {
  scope: string;
  client_id: number;
  expires_in: number;
}

export interface VerifyLINEJWT {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  nonce: string;
  amr: string[];
  name: string;
  picture: string;
  email: string;
}

export interface LINEUserProfile {
  userId: string;
  displayName: string;
  pictureUrl: string;
  statusMessage: string;
}
