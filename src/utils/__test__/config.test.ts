import { Config } from "../config";
import { GenericError } from "../errors";
import nconf from 'nconf';


describe("Config Module", () => {
    describe(`"nconf" getter`, () => {
        describe("Exception Path", () => {
            it.skip("If nconf is not required for the process, should throw an error", () => {
                const config = Config.getInstance();
                expect(() => config.nconf).toThrow(GenericError);
                expect(() => config.nconf).toThrow("Cannot get nconf if not required");
            });
        });

        describe("Happy Path", () => {
            it("If nconf is required for the process, should return nconf", () => {
                const config = Config.getInstance();
                const _nconf = config.nconf;
                expect(_nconf).toStrictEqual(nconf);
            });
        });
    });
});
