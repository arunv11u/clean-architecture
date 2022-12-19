import { Request, Response } from "express";
import { Cookie, Cookies } from "../types";
import { CookieImpl } from "./cookie";

describe("Cookies Module", () => {

    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockCookieFn: jest.Mock = jest.fn();
    let mockClearCookieFn: jest.Mock = jest.fn();
    let cookie: Cookie;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            cookie: mockCookieFn,
            clearCookie: mockClearCookieFn
        };
        cookie = new CookieImpl();
    });
    describe(`"set" method`, () => {
        describe("Happy Path", () => {
            it("Passing response object and cookies data, should set the cookie", () => {
                cookie.set(mockResponse as Response, { name: Cookies.lifeverseChristmasEventAuth, value: "Auth Token" });
                
                expect(mockCookieFn).toHaveBeenCalled();
            });

            it("Passing response object, cookies data and cookies options, should set the cookie", () => {
                cookie.set(mockResponse as Response, { name: Cookies.lifeverseChristmasEventAuth, value: "Auth Token" }, { secure: true, maxAge: 10000 });
                
                expect(mockCookieFn).toHaveBeenCalled();
            });
        });
    });

    describe(`"getCookies" method`, () => {
        describe("Happy Path", () => {
            it("Passing no inputs, should return cookies", () => {
                mockRequest = { cookies: { lifeversechristmasevent_auth: "Auth Token" } };
                const cookies = cookie.getCookies(mockRequest as Request);

                expect(cookies).toStrictEqual(mockRequest.cookies);
            });
        });
    });

    describe(`"getSignedCookies" method`, () => {
        describe("Happy Path", () => {
            it("Passing no inputs, should return signed cookies", () => {
                mockRequest = { signedCookies: { lifeversechristmasevent_refresh: "Refresh Token" } };
                const cookies = cookie.getSignedCookies(mockRequest as Request);

                expect(cookies).toStrictEqual(mockRequest.signedCookies);
            });
        });
    });

    describe(`"clear" method`, () => {
        describe("Happy Path", () => {
            it("Passing reponse and cookie name, should clear the cookie", () => {
                cookie.clear(mockResponse as Response, Cookies.lifeverseChristmasEventAuth);

                expect(mockClearCookieFn).toHaveBeenCalled();
            });

            it("Passing reponse, cookie name and cookie options, should clear the cookie", () => {
                cookie.clear(mockResponse as Response, Cookies.lifeverseChristmasEventAuth, { path: "/api" });

                expect(mockClearCookieFn).toHaveBeenCalled();
            });
        });
    });

});