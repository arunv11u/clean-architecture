import { faker } from '@faker-js/faker';
import mockUserDAOImpl, { mockSave as mockUserSave } from '../../users/daos/__mocks__/user.dao.mock';
import mockTokenDAOImpl from '../../tokens/daos/__mocks__/token.dao.mock';
import { AuthRepository, GuestLoginInput, MongooseHelper, MongooseHelperImpl, TokenTypes } from '../../utils';
import { AuthRepositoryImpl } from './auth.repository';

jest.mock('../../users/daos/user.dao', () => {
    return {
        UserDAOImpl: mockUserDAOImpl
    };
});

jest.mock('../../tokens/daos/token.dao', () => {
    return {
        TokenDAOImpl: mockTokenDAOImpl
    };
});

describe("Auth Component", () => {
    let authRepository: AuthRepository;
    let mongooseHelper: MongooseHelper;

    beforeEach(() => {
        authRepository = new AuthRepositoryImpl();
        mongooseHelper = new MongooseHelperImpl();
    });

    afterEach(() => {
        mockUserSave.mockReset();
    });

    describe("Repository Module", () => {

        describe(`"guestLogin" method`, () => {

            describe("Happy Path", () => {
                it("If guest login data passed, should create the user and token document", async () => {
                    mockUserSave.mockImplementation(() => ({ user: { id: mongooseHelper.getObjectId() } }));

                    const guestLogin: GuestLoginInput = {
                        user: {
                            name: faker.name.fullName(),
                            email: faker.internet.email(),
                            phone: {
                                code: "+91",
                                number: "9876543210"
                            },
                            userId: faker.random.alphaNumeric(8)
                        }
                    };

                    await authRepository.guestLogin(guestLogin);

                    expect(mockUserSave).toHaveBeenCalled();
                });
            });
        });
    });
});
