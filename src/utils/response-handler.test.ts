import { ResponseHandler } from './response-handler';

describe("Response Handler Module", () => {

    describe(`"getInstance" method`, () => {
        describe("Happy Path", () => {
            it("No input has passed, should return config object", () => {
                const _responseHandler = ResponseHandler.getInstance();

                expect(_responseHandler).toBeInstanceOf(ResponseHandler);
            });
        });
    });

});
