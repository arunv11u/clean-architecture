import { CookieOptions, Response, Request } from "express";

enum Cookies {
    sampleapp_auth = "sampleapp_auth",
    sampleapp_refresh = "sampleapp_refresh"
};

interface CookieData {
    name: Cookies;
    value: string;
};

interface CookiesObj { };

interface SignedCookiesObj {
    sampleapp_auth: string;
    sampleapp_refresh: string;
};

interface Cookie {
    set(response: Response, cookieData: CookieData, cookieOptions?: CookieOptions): void;
    getCookies(request: Request): CookiesObj;
    getSignedCookies(request: Request): SignedCookiesObj;
    clear(response: Response, key: Cookies, cookieOptions?: CookieOptions): void;
};

export {
    Cookies,
    CookieData,
    CookiesObj,
    SignedCookiesObj,
    Cookie
};
