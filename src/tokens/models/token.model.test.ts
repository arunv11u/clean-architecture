import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { TokenTypes } from '../../utils';
import { BuildToken, SaveTokenTypes, Token, TokenDoc } from './token.model';

function getTokenDoc() {
    return new Token({
        type: TokenTypes.refresh,
        value: faker.random.alphaNumeric(8),
        user: new mongoose.Types.ObjectId()
    });
};

function getExpectedTokenObj(tokenDoc: TokenDoc) {
    return {
        id: tokenDoc._id,
        type: tokenDoc.type,
        value: tokenDoc.value,
        user: tokenDoc.user,
        isDeleted: tokenDoc.isDeleted
    };
};

describe("Token Component", () => {
    describe("Token Model", () => {

        describe(`"build" method in token schema statics`, () => {
            describe("Happy Path", () => {
                it("Token details passed as input, should return token object", () => {
                    const tokenId = new mongoose.Types.ObjectId();
                    const tokenAttrs: BuildToken = {
                        _id: tokenId,
                        type: SaveTokenTypes.refresh,
                        value: faker.random.alphaNumeric(10),
                        user: new mongoose.Types.ObjectId(),
                        refreshTokenUsed: tokenId
                    };

                    expect(Token.build(tokenAttrs)).toBeInstanceOf(Token);
                });
            });
        });

        describe(`"jsonObj" method in token schema statics`, () => {
            describe("Happy Path", () => {
                it("If a mongoose document provided as input, should return equivalent JSON object", () => {
                    const tokenDoc = getTokenDoc();

                    const tokenObj = Token.jsonObj(tokenDoc) as TokenDoc;

                    const expectedTokenObj = getExpectedTokenObj(tokenDoc);
                    expect(tokenObj).not.toBeInstanceOf(Token);
                    expect(tokenObj).toStrictEqual(expectedTokenObj);
                });

                it("If array of mongoose documents provided as input, should return equivalent JSON objects", () => {
                    const tokenDoc1 = getTokenDoc();
                    const tokenDoc2 = getTokenDoc();

                    const tokensObj = Token.jsonObj([tokenDoc1, tokenDoc2] as any) as TokenDoc[];

                    const expectedTokensObj = [getExpectedTokenObj(tokenDoc1), getExpectedTokenObj(tokenDoc2)];
                    expect(tokensObj).not.toBeInstanceOf(Token);
                    expect(tokensObj).toStrictEqual(expectedTokensObj);
                });

                it("If null is passed as input, should return null", () => {
                    expect(Token.jsonObj(null)).toBe(null);
                });
            });
        });
    });
});
