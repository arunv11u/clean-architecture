import jwt from "jsonwebtoken";
import nconf from "nconf";
import { ResponseHandler, ResponseHandlerImpl, UserTokenPayload, TokenService, UserDecodedPayload, UserRefreshTokenRes, TokenTypes, TokenDAO, CreateTokenInput, TokenRepository, MongooseSessionHelper, MongooseSessionHelperImpl } from "../../utils";
import { TokenDAOImpl } from "../daos/token.dao";
import { TokenRepositoryImpl } from "../repositories/token.repository";


export class TokenServiceImpl implements TokenService {

    private _reponseHandler: ResponseHandler;
    private _tokenDAO: TokenDAO;
    private _tokenRepository: TokenRepository;
    private _mongooseSessionHelper: MongooseSessionHelper;

    constructor() {
        this._reponseHandler = new ResponseHandlerImpl();
        this._tokenDAO = new TokenDAOImpl();
        this._tokenRepository = new TokenRepositoryImpl();
        this._mongooseSessionHelper = new MongooseSessionHelperImpl();
    };

    async user(payload: UserTokenPayload, options?: jwt.SignOptions): Promise<string> {

        if (!payload) throw this._reponseHandler.internalError("Payload is invalid");

        const secretKey: string = nconf.get("jwtSecretKey");

        const tokenGeneratePromise = new Promise<string>((resolve, reject) => {
            jwt.sign(JSON.stringify(payload), secretKey, {}, (err, token) => {
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

                decoded = JSON.parse(decoded as string) as jwt.JwtPayload;

                const _decoded: UserDecodedPayload = {
                    id: decoded.id,
                    type: decoded.type,
                    userId: decoded.userId
                };

                resolve(_decoded);
            });
        });

        return verifyTokenPromise;
    };

    async refreshUser(token: string, options?: jwt.SignOptions): Promise<UserRefreshTokenRes> {
        const session = await this._mongooseSessionHelper.start();
        try {  
            const refreshTokenRes: UserRefreshTokenRes = {
                isStolenToken: true
            };
    
            if (!token) throw this._reponseHandler.internalError("Token is invalid");
    
            const decodedToken = await this.verify(token);
    
            const userTokenPayload: UserTokenPayload = {
                id: decodedToken.id,
                type: TokenTypes.refresh,
                userId: decodedToken.userId
            };
            refreshTokenRes.userDecodedPayload = userTokenPayload;
    
            const isStolenToken = await this._tokenRepository.expireRefreshTokensIfStolen(decodedToken.id, session);
    
            if (!isStolenToken) {
                const accessToken = await this.user(userTokenPayload, { expiresIn: nconf.get("authExpiryMs") });
                const refreshToken = await this.user(userTokenPayload, { expiresIn: nconf.get("refreshExpiryMs") });
    
                const tokenDetails: CreateTokenInput = {
                    refreshTokenUsed: decodedToken.id,
                    user: decodedToken.userId,
                    value: refreshToken
                };
                await this._tokenDAO.saveRefreshToken(tokenDetails, session);
    
                refreshTokenRes.isStolenToken = false;
                refreshTokenRes.refreshedTokens = {
                    accessToken,
                    refreshToken
                };
            };
    
            await this._mongooseSessionHelper.commit(session);

            return refreshTokenRes;
        } catch (error) {
            await this._mongooseSessionHelper.abort(session);

            throw error;
        };
    };
};
