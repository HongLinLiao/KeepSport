import { SignInType } from '../auth/jwt';

export interface UserInfo {
  uid: string;
  userName: string;
  avatar: string;
  signInType: SignInType;
  thirdPartyUid: string;
}
