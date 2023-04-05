import Env from '@/enums/Env';

export default interface Environment {
  ENV: Env;
  LINE_OAUTH_CLIENT_ID: string;
  LINE_OAUTH_CLIENT_SECRET: string;
}
