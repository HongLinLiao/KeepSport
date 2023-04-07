import Env from '@/enums/Env';
import Environment from '@/interfaces/Environment';

const getEnv = (): Environment => {
  return {
    ENV: process.env.ENV as Env,
  };
};

export default getEnv;
