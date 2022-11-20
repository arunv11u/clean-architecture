import { UserPipe } from '../../../users';
import { PipeFactory } from '../pipe.factory';

const pipeFactory = PipeFactory.getInstance();

describe("Factory Module", () => {
    describe("Pipe Factory", () => {
        describe(`"getUserPipe" method`, () => {
            describe("Happy Path", () => {
                it("No input has passed, should return user pipe object", () => { 
                    const userPipe = pipeFactory.getUserPipe();
                    expect(userPipe).toBeInstanceOf(UserPipe);
                });
            });
        });
    });
});
