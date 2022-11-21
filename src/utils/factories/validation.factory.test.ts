import { validationFactory } from '../../global-config';
import { UserValidation } from '../../users';


describe("Factory Module", () => {
    describe("Validation Factory", () => {
        describe(`"getUserValidation" method`, () => {
            describe("Happy Path", () => {
                it("No input has passed, should return user validation object", () => { 
                    const userValidation = validationFactory.getUserValidation();
                    expect(userValidation).toBeInstanceOf(UserValidation);
                });
            });
        });
    });
});

