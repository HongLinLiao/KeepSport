import { useMemo } from 'react';
import CookieKey from '@/enums/CookieKey';
import cookie from 'js-cookie';
import LoginType from '@/enums/LoginType';

interface CookieOperator<T> {
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
}

const generator = <T>(key: CookieKey): CookieOperator<T> => {
  return {
    get() {
      return JSON.parse(cookie.get(key)) as T;
    },
    set(value) {
      cookie.set(
        key,
        value instanceof String ? (value as string) : JSON.stringify(value)
      );
    },
    remove() {
      cookie.remove(key);
    },
  };
};

const useCookie = () => {
  const tokenOperator = useMemo(() => {
    return generator<{ type: LoginType; token: string }>(CookieKey.TOKEN);
  }, []);

  return {
    token: tokenOperator,
  };
};

export default useCookie;
