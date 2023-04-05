import Env from '@/enums/Env';
import Environment from '@/interfaces/Environment';

const getEnv = (): Environment => {
  return {
    ENV: process.env.ENV as Env,
    LINE_OAUTH_CLIENT_ID: process.env.LINE_OAUTH_CLIENT_ID as string,
    LINE_OAUTH_CLIENT_SECRET: process.env.LINE_OAUTH_CLIENT_SECRET as string,
  };
};

export default getEnv;
