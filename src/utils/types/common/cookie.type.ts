import { CookieOptions, Response, Request } from "express";

enum Cookies { 
    appnameCookieName = "appname_cookiename"
};

enum SignedCookies {
    lifeverseChristmasEventAuthToken = "lifeversechristmasevent_auth",
    lifeverseChristmasEventRefreshToken = "lifeversechristmasevent_refresh"
};

interface CookieData {
    name: SignedCookies;
    value: string;
};

type CookiesObj = Record<Cookies, string>;

type SignedCookiesObj = Record<SignedCookies, string>;

type ModCookiesObj = Record<keyof typeof Cookies, string>;

type ModSignedCookiesObj = Record<keyof typeof SignedCookies, string>;

interface Cookie {
    set(response: Response, cookieData: CookieData, cookieOptions?: CookieOptions): void;
    getCookies(request: Request): ModCookiesObj;
    getSignedCookies(request: Request): ModSignedCookiesObj;
    clear(response: Response, key: Cookies | SignedCookies, cookieOptions?: CookieOptions): void;
};

export {
    Cookies,
    SignedCookies,
    CookieData,
    CookiesObj,
    SignedCookiesObj,
    ModCookiesObj,
    ModSignedCookiesObj,
    Cookie
};
