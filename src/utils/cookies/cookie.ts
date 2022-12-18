import { Request, Response, CookieOptions } from "express";
import { Cookie, CookieData, Cookies, CookiesObj, SignedCookiesObj } from "../types";


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

    set(response: Response<any, Record<string, any>>, cookieData: CookieData, cookieOptions?: CookieOptions | undefined): void {
        if (cookieOptions) cookieOptions = { ...this._cookieOptions, ...cookieOptions };
        else cookieOptions = this._cookieOptions;

        response.cookie(cookieData.name, cookieData.value, cookieOptions)
    };

    getCookies(request: Request<any, Record<string, any>>): CookiesObj {
        return request.cookies;
    };

    getSignedCookies(request: Request<any, Record<string, any>>): SignedCookiesObj {
        return request.signedCookies;
    };

    clear(response: Response<any, Record<string, any>>, key: Cookies, cookieOptions?: CookieOptions | undefined): void {
        if (cookieOptions) cookieOptions = { ...this._cookieOptions, ...cookieOptions };
        else cookieOptions = this._cookieOptions;

        response.clearCookie(key, cookieOptions);
    };
};
