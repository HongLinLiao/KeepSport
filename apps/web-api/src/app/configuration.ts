import { Env } from './enums/Env.enum';
import { IConfig } from './interfaces/Config.interface';

const configuration = (): { config: IConfig } => ({
  config: {
    env: (process.env.ENV as Env) || Env.LOCAL,
    port: parseInt(process.env.PORT, 10) || 3000,
    line_oauth_client_id: process.env.LINE_OAUTH_CLIENT_ID || '',
    line_oauth_client_secret: process.env.LINE_OAUTH_CLIENT_SECRET || '',
    line_oauth_redirect_url: process.env.LINE_OAUTH_REDIRECT_URL || '',
    jwt_secret: process.env.JWT_SECRET || '',
    mongo_connection: process.env.MONGO_CONNECTION || '',
  },
});

export default configuration;
