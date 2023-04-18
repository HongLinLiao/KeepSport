import { Env } from '../enums/Env.enum';

export interface IConfig {
  env: Env;
  port: number;
  line_oauth_client_id: string;
  line_oauth_client_secret: string;
  line_oauth_redirect_url: string;
  jwt_secret: string;
}
