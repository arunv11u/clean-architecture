import { Request, Response, CookieOptions } from "express";
import { Cookie, CookieData, Cookies, CookiesObj, ModCookiesObj, ModSignedCookiesObj, SignedCookieData, SignedCookies, SignedCookiesObj } from "../types";


export class CookieImpl implements Cookie {

    private _cookieOptions: CookieOptions;
    constructor() {
        this._cookieOptions = {
            path: "/api",
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        };
    };

    setCookies(response: Response<any, Record<string, any>>, cookieData: CookieData, cookieOptions?: CookieOptions | undefined): void {
        if (cookieOptions) cookieOptions = { ...this._cookieOptions, ...cookieOptions };
        else cookieOptions = this._cookieOptions;

        response.cookie(cookieData.name, cookieData.value, cookieOptions)
    };

    setSignedCookies(response: Response<any, Record<string, any>>, cookieData: SignedCookieData, cookieOptions?: CookieOptions | undefined): void {
        if (cookieOptions) cookieOptions = { ...this._cookieOptions, signed: true, ...cookieOptions };
        else cookieOptions = this._cookieOptions;

        response.cookie(cookieData.name, cookieData.value, cookieOptions)
    };

    getCookies(request: Request<any, Record<string, any>>): ModCookiesObj {
        const cookies = request.cookies as CookiesObj;

        const modCookies: ModCookiesObj = {
            appnameCookieName: cookies.appname_cookiename
        };

        return modCookies;
    };

    getSignedCookies(request: Request<any, Record<string, any>>): ModSignedCookiesObj {
        const signedCookies = request.signedCookies as SignedCookiesObj;

        const modSignedCookies: ModSignedCookiesObj = {
            lifeverseChristmasEventAuthToken: signedCookies.lifeversechristmasevent_auth,
            lifeverseChristmasEventRefreshToken: signedCookies.lifeversechristmasevent_refresh
        };

        return modSignedCookies;
    };

    clear(response: Response<any, Record<string, any>>, key: Cookies | SignedCookies, cookieOptions?: CookieOptions | undefined): void {
        if (cookieOptions) cookieOptions = { ...this._cookieOptions, ...cookieOptions };
        else cookieOptions = this._cookieOptions;

        response.clearCookie(key, cookieOptions);
    };
};
