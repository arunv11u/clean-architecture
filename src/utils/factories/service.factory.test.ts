import { serviceFactory } from '../../global-config';
import { UserService } from '../../users';


describe("Factory Module", () => {
    describe("Service Factory", () => {
        describe(`"getUserService" method`, () => {
            describe("Happy Path", () => {
                it("No input has passed, should return user service object", () => { 
                    const userService = serviceFactory.getUserService();
                    expect(userService).toBeInstanceOf(UserService);
                });
            });
        });
    });
});

