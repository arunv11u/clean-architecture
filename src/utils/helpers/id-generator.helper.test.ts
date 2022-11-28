import { IdGeneratorHelper } from "../types";
import { IdGeneratorHelperImpl } from "./id-generator.helper";

describe("Helper Module", () => {
    describe("IdGenerator Helper", () => {
        const idGeneratorHelper: IdGeneratorHelper = new IdGeneratorHelperImpl();

        describe(`"randomUUID" method`, () => {
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
