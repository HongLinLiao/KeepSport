import getEnv from '@/utils/env';

export default function handler(req, res) {
  res.status(200).json(getEnv());
}
