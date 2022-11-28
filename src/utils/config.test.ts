import nconf from 'nconf';
import { config } from "./config";
import { Environment } from "./types";


describe("Config Module", () => {

    describe(`"nconf" getter`, () => {
        describe("Happy Path", () => {
            it("If nconf is required for the process, should return nconf", () => {
                const _nconf = config.nconf;

                expect(_nconf).toStrictEqual(nconf);
            });
        });
    });

    describe(`"set" method`, () => {

        describe("Happy Path", () => {
            it("Testing environment and config passed has arguments, should set the process variables", () => {
                const _nconf = config.nconf;
                const _envConfig = { port: 8080, secretKey: "secret" };

                config.set(process.env.NODE_ENV as Environment, { prodConfig: {}, testConfig: _envConfig });

                expect(_nconf.get("port")).toBe(_envConfig.port);
                expect(_nconf.get("secretKey")).toBe(_envConfig.secretKey);
            });

            it("Production environment and config passed has arguments, should set the process variables", () => {
                const _nconf = config.nconf;
                const _envConfig = { port: 4000, secretKey: "secret1" };

                config.set(Environment.PRODUCTION, { prodConfig: _envConfig });

                expect(_nconf.get("port")).toBe(_envConfig.port);
                expect(_nconf.get("secretKey")).toBe(_envConfig.secretKey);
            });

            it("Staging environment and config passed has arguments, should set the process variables", () => {
                const _nconf = config.nconf;
                const _envConfig = { port: 4000, secretKey: "secret1" };

                config.set(Environment.STAGING, { prodConfig: {}, stagingConfig: _envConfig });

                expect(_nconf.get("port")).toBe(_envConfig.port);
                expect(_nconf.get("secretKey")).toBe(_envConfig.secretKey);
            });

            it("Dev environment and config passed has arguments, should set the process variables", () => {
                const _nconf = config.nconf;
                const _envConfig = { port: 4000, secretKey: "secret1" };

                config.set(Environment.DEV, { prodConfig: {}, devConfig: _envConfig });

                expect(_nconf.get("port")).toBe(_envConfig.port);
                expect(_nconf.get("secretKey")).toBe(_envConfig.secretKey);
            });

            it("Unknown environment and config passed has arguments, should consider the dev environment as default and set the process variables", () => {
                const _nconf = config.nconf;
                const _envConfig = { port: 4000, secretKey: "secret1" };

                config.set("some environment" as any, { prodConfig: {}, devConfig: _envConfig });

                expect(_nconf.get("port")).toBe(_envConfig.port);
                expect(_nconf.get("secretKey")).toBe(_envConfig.secretKey);
            });
        });
    });
});
