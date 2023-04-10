import { SignInType } from '@model';

export interface ThirdPartyJwtInfo {
  uid: string;
  userName: string;
  avatar: string;
  signInType: SignInType;
}

export interface JwtInfo extends ThirdPartyJwtInfo {
  thirdPartyUid: string;
}

export interface JwtFullData extends JwtInfo {
  iat: number;
  exp: number;
  iss: string;
}
