import { faker } from '@faker-js/faker';
import mockUserDAOMongooseImpl, { mockSave as mockUserSave } from '../../users/daos/__mocks__/user.dao';
import mockTokenDAOMongooseImpl, { mockSave as mockTokenSave } from '../../tokens/daos/__mocks__/token.dao';
import { AuthRepository, GuestLoginInput } from '../../utils';
import { AuthRepositoryImpl } from './auth.repository';

jest.mock('../../users/daos/user.dao', () => {
    return {
        UserDAOMongooseImpl: mockUserDAOMongooseImpl
    };
});

jest.mock('../../tokens/daos/token.dao', () => {
    return {
        TokenDAOMongooseImpl: mockTokenDAOMongooseImpl
    };
});

describe("Auth Component", () => {

    describe("Repository Module", () => {

        const authRepository: AuthRepository = new AuthRepositoryImpl();

        describe(`"guestLogin" method`, () => {

            describe("Happy Path", () => {
                it("If guest login data passed, should create the user and token document", async () => {
                    const guestLoginData: GuestLoginInput = {
                        user: {
                            name: faker.name.fullName(),
                            email: faker.internet.email(),
                            mobileNumber: faker.phone.number()
                        },
                        token: {
                            value: faker.random.alphaNumeric()
                        }
                    };

                    await authRepository.guestLogin(guestLoginData);

                    expect(mockUserDAOMongooseImpl).toHaveBeenCalled();
                    expect(mockUserSave).toHaveBeenCalled();

                    expect(mockTokenDAOMongooseImpl).toHaveBeenCalled();
                    expect(mockTokenSave).toHaveBeenCalled();
                });
            });
        });
    });
});
