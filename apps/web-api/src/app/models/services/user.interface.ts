import { SignInType } from '@model';

export interface UserInfo {
  uid?: string;
  name: string;
  avatar?: string;
  signInType: SignInType;
  thirdPartyUid: string;
}
