import mongoose from 'mongoose';
import { MongooseSessionHelper } from '../types';
import { MongooseSessionHelperImpl } from './mongoose-session.helper';

jest.mock("mongoose");

describe("Mongoose Session Helper Module", () => {
    const mockStartSession = jest.fn();
    const mockStartTransaction = jest.fn();
    const mockCommitTransaction = jest.fn();
    const mockAbortTransaction = jest.fn();
    const mockEndSession = jest.fn();
    let mongooseSessionHelperImpl: MongooseSessionHelper;

    beforeEach(() => {
        mongoose.startSession = mockStartSession.mockImplementation(() => {
            return {
                startTransaction: mockStartTransaction,
                commitTransaction: mockCommitTransaction,
                abortTransaction: mockAbortTransaction,
                endSession: mockEndSession
            };
        });
        mongooseSessionHelperImpl = new MongooseSessionHelperImpl();
    });

    describe(`"start" method`, () => {
        describe("Happy Path", () => {
            it("No inputs passed, should start session and transaction and return the session", async () => {
                await mongooseSessionHelperImpl.start();

                expect(mockStartSession).toHaveBeenCalled();
                expect(mockStartTransaction).toHaveBeenCalled();
            });
        });
    });

    describe(`"commit" method`, () => {
        describe("Happy Path", () => {
            it("Session has passed as input, should commit transaction and end session", async () => {
                const session = await mongooseSessionHelperImpl.start();

                await mongooseSessionHelperImpl.commit(session);

                expect(mockCommitTransaction).toHaveBeenCalled();
                expect(mockEndSession).toHaveBeenCalled();
            });
        });
    });

    describe(`"abort" method`, () => {
        describe("Happy Path", () => {
            it("Session has passed as input, should abort transaction and end session", async () => {
                const session = await mongooseSessionHelperImpl.start();

                await mongooseSessionHelperImpl.abort(session);

                expect(mockAbortTransaction).toHaveBeenCalled();
                expect(mockEndSession).toHaveBeenCalled();
            });
        });
    });
});
