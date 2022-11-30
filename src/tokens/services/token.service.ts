import jwt from "jsonwebtoken";
import nconf from 'nconf';
import { ResponseHandler, ResponseHandlerImpl, UserTokenPayload, TokenService, config, UserDecodedPayload } from "../../utils";

export class TokenServiceImpl implements TokenService {

    private _reponseHandler: ResponseHandler;

    constructor() {
        this._reponseHandler = new ResponseHandlerImpl();
    };

    async user(payload: UserTokenPayload): Promise<string> {

        if (!payload) throw this._reponseHandler.internalError("Payload is invalid");

        const secretKey: string = nconf.get("jwtSecretKey");

        const tokenGeneratePromise = new Promise<string>((resolve, reject) => {
            jwt.sign(payload, secretKey, {}, (err, token) => {
                if (err) reject(this._reponseHandler.internalError("JWT token generation failed"));

                resolve(token as string);
            });
        });

        return tokenGeneratePromise;
    };

    async verify(token: string): Promise<UserDecodedPayload> {
        if (!token) throw this._reponseHandler.internalError("Token is invalid");

        const secretKey: string = nconf.get("jwtSecretKey");
        const verifyTokenPromise = new Promise<UserDecodedPayload>((resolve, reject) => {
            jwt.verify(token, secretKey, {}, (err, decoded) => {
                if (err) return reject(this._reponseHandler.internalError("Token is invalid"));

                const _decoded: UserDecodedPayload = {
                    userId: (decoded as jwt.JwtPayload).userId
                };

                resolve(_decoded);
            });
        });

        return verifyTokenPromise;
    };
};
