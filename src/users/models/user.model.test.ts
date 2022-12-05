import { faker } from '@faker-js/faker';
import { BuildUser, User, UserDoc } from './user.model';

function getUserDoc() {
    return new User({
        name: faker.name.fullName(),
        userId: faker.random.alphaNumeric(8)
    });
};

function getExpectedUserObj(userDoc: UserDoc) {
    return {
        id: userDoc._id,
        name: userDoc.name,
        userId: userDoc.userId,
        isDeleted: userDoc.isDeleted
    };
};

describe("User Component", () => {
    describe("User Model", () => {

        describe(`"build" method in user schema statics`, () => {
            describe("Happy Path", () => {
                it("User details passed as input, should return user object", () => {
                    const userAttrs: BuildUser = {
                        name: faker.name.fullName(),
                        userId: faker.random.alphaNumeric(8),
                        locals: { user: { id: faker.random.alphaNumeric(10) } as any }
                    };

                    expect(User.build(userAttrs)).toBeInstanceOf(User);
                });
            });
        });

        describe(`"jsonObj" method in user schema statics`, () => {
            describe("Happy Path", () => {
                it("If a mongoose document provided as input, should return equivalent JSON object", () => {
                    const userDoc = getUserDoc();

                    const userObj = User.jsonObj(userDoc) as UserDoc;

                    const expectedUserObj = getExpectedUserObj(userDoc);
                    expect(userObj).not.toBeInstanceOf(User);
                    expect(userObj).toStrictEqual(expectedUserObj);
                });

                it("If array of mongoose documents provided as input, should return equivalent JSON objects", () => {
                    const userDoc1 = getUserDoc();
                    const userDoc2 = getUserDoc();

                    const userObj = User.jsonObj([userDoc1, userDoc2] as any) as UserDoc[];

                    const expectedUsersObj = [getExpectedUserObj(userDoc1), getExpectedUserObj(userDoc2)];
                    expect(userObj).not.toBeInstanceOf(User);
                    expect(userObj).toStrictEqual(expectedUsersObj);
                });

                it("If null is passed as input, should return null", () => {
                    expect(User.jsonObj(null)).toBe(null);
                });
            });
        });
    });
});
