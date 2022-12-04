import crypto from 'crypto';
import { GenericError } from '../errors';
import { IdGeneratorHelper } from "../types";
import { IdGeneratorHelperImpl } from "./id-generator.helper";

jest.mock("crypto");

describe("Helper Module", () => {

    describe("IdGenerator Helper", () => {
        const buff: string = "ab0c5342F";
        const idGeneratorHelper: IdGeneratorHelper = new IdGeneratorHelperImpl();

        beforeEach(() => {
            (crypto.randomFill as any) = (buffer: any, cb: (err: Error | null, buf: any) => void): void => {
                cb(null, Buffer.from(buff, 'hex'));
            };
        });

        describe(`"randomUUID" method`, () => {

            describe("Exception Path", () => {
                it("If randomFill method in crypto return error, should throw error", () => {
                    (crypto.randomFill as any) = (buffer: any, cb: (err: Error | null, buf: any) => void): void => {
                        cb(new Error("Some error"), null);
                    };

                    expect(idGeneratorHelper.short8).rejects.toStrictEqual(new GenericError({ error: new Error("Short-8 Id generation failed"), errorCode: 500 }));
                });
            });

            describe("Happy Path", () => {
                it("No inputs provided, should return random UUID", async () => {
                    const uid = await idGeneratorHelper.short8();

                    expect(typeof uid).toBe('string');
                    expect(uid.length).toBe(8);
                });
            });
        });
    });
});
