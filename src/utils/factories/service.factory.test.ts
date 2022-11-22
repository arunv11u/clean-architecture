import { serviceFactory } from '../../global-config';
import { UserService } from '../../users';
import { AuthService } from '../../auth';


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

        describe(`"getAuthService" method`, () => {
            describe("Happy Path", () => {
                it("No input has passed, should return auth service object", () => { 
                    const authService = serviceFactory.getAuthService();
                    expect(authService).toBeInstanceOf(AuthService);
                });
            });
        });
    });
});

