import { GenericError } from "../../utils/errors";
import mockMongooseServiceImpl, { mockSave } from '../../utils/services/__mocks__/mongoose.service';
import { TokenDAOImpl } from "./token.dao";


jest.mock('../../utils', () => {
    const originalModule =
        jest.requireActual<typeof import('../../utils')>('../../utils');

    return {
        __esModule: true,
        ...originalModule,
        MongooseServiceImpl: mockMongooseServiceImpl
    };
});

describe("Token Component", () => {
    describe("DAO Module", () => {
        const tokenDAO = new TokenDAOImpl();

        describe(`"save" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => tokenDAO.save(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => tokenDAO.save(undefined as any)).rejects.toThrow("Token details is undefined in save token DAO, expected token details");
                });
            });

            describe("Happy Path", () => {
                it("Token details passed, should save the token", async () => {
                    await tokenDAO.save({} as any);

                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockSave).toHaveBeenCalled();
                });
            });
        });
    });
});
