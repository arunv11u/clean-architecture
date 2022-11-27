import { faker } from '@faker-js/faker';
import mockUserDAOMongooseImpl, { mockSave as mockUserSave } from '../../users/daos/__mocks__/user.dao';
import { AuthRepository, GuestLoginInput } from '../../utils';
import { AuthRepoMongooseImpl } from './auth.repository';

jest.mock('../../users/daos/user.dao', () => {
    return {
        UserDAOMongooseImpl: mockUserDAOMongooseImpl
    };
});

describe("Auth Component", () => {

    describe("Repository Module", () => {

        const authRepository: AuthRepository = new AuthRepoMongooseImpl();

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
                });
            });
        });
    });
});
