import mockMongooseServiceImpl, { mockSave } from '../../utils/services/__mocks__/mongoose.service.mock';
import { GenericError, TokenDAO } from '../../utils';
import { TokenDAOMongooseImpl } from './token.dao';


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
    let tokenDAO: TokenDAO;
    beforeEach(() => {
        tokenDAO = new TokenDAOMongooseImpl();
    });

    describe("DAO Module", () => {
        describe(`"saveRefreshToken" method`, () => {
            describe("Exception Path", () => {
                it("If undefined passed as an argument, should throw error", () => {
                    expect(() => tokenDAO.saveRefreshToken(undefined as any)).rejects.toThrow(GenericError);
                    expect(() => tokenDAO.saveRefreshToken(undefined as any)).rejects.toThrow("Token details is undefined in save token DAO, expected token details");
                });
            });

            describe("Happy Path", () => {
                it("Token details passed, should save the token", async () => {
                    await tokenDAO.saveRefreshToken({} as any);

                    expect(mockMongooseServiceImpl).toHaveBeenCalled();
                    expect(mockSave).toHaveBeenCalled();
                });
            });
        });
    });
});
