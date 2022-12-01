import mockLoaderImpl, { mockLoad } from './utils/__mocks__/loader';
import { App } from './app';


jest.mock('./utils/loader', () => {
    return {
        LoaderImpl: mockLoaderImpl
    };
});


jest.mock('./server', () => {
    return {
        server: {
            listen: jest.fn()
        }
    };
});

describe("App Module", () => {
    let app = new App();

    describe(`"main" method`, () => {
        describe("Happy Path", () => {
            it("Should start up the server", async () => {
                await app.main();

                expect(mockLoad).toHaveBeenCalled();
            });
        });
    });
});
