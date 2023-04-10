import { useMemo } from 'react';
import CookieKey from '@/enums/CookieKey';
import cookie from 'js-cookie';

interface CookieOperator<T> {
  get: () => T;
  set: (value: T) => void;
  remove: () => void;
}

const generator = <T>(key: CookieKey): CookieOperator<T> => {
  return {
    get() {
      const data = cookie.get(key);
      if (data) {
        return JSON.parse(cookie.get(key)) as T;
      } else {
        return data;
      }
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
    return generator<string>(CookieKey.TOKEN);
  }, []);

  return {
    token: tokenOperator,
  };
};

export default useCookie;
