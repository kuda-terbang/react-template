import cookie from 'js-cookie';

export const setCookie = (key: string, value: string) => cookie.set(key, value);
export const getCookie = (key: string) => cookie.get(key);
export const getCookieAll = () => cookie.get();
