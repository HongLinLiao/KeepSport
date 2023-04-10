export enum SignInType {
  LINE = 1,
}

export interface SignInBody {
  code: string;
  state: string;
  signInType: SignInType;
}
