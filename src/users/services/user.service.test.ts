import { faker } from "@faker-js/faker";
import { UserService } from "../../utils";
import mockIdGeneratorHelperImpl, { mockShort8 } from "../../utils/helpers/__mocks__/id-generator.helper";
import mockUserDAOMongooseImpl, { mockCheckUserExists } from "../daos/__mocks__/user.dao";
import { UserServiceImpl } from "./user.service";

jest.mock('../../utils', () => {
  const originalModule =
    jest.requireActual<typeof import('../../utils')>('../../utils');

  return {
    __esModule: true,
    ...originalModule,
    IdGeneratorHelperImpl: mockIdGeneratorHelperImpl
  };
});

jest.mock('../daos/user.dao', () => {
  const originalModule =
    jest.requireActual<typeof import('../daos/user.dao')>('../daos/user.dao');

  return {
    __esModule: true,
    ...originalModule,
    UserDAOMongooseImpl: mockUserDAOMongooseImpl
  };
});

describe("User Component", () => {
  describe("Service Module", () => {

    beforeEach(() => {
      mockShort8.mockReset();
      mockCheckUserExists.mockReset();
    });

    describe(`"generateUserId" method`, () => {

      let userService: UserService;

      beforeEach(() => {
        userService = new UserServiceImpl();
      });

      describe("Happy Path", () => {
        it("No inputs provided, should return unique user id", async () => {

          mockShort8.mockImplementation(() => faker.random.alphaNumeric(8));
          mockCheckUserExists.mockImplementation(() => false);

          await userService.generateUserId();

          expect(mockIdGeneratorHelperImpl).toHaveBeenCalled();
          expect(mockShort8).toHaveBeenCalled();

          expect(mockUserDAOMongooseImpl).toHaveBeenCalled();
          expect(mockCheckUserExists).toHaveBeenCalled();
        });
      });
    });
  });
});
