export const mockStart = jest.fn();
export const mockCommit = jest.fn();
export const mockAbort = jest.fn();


const mock = jest.fn().mockImplementation(() => {
    return {
        start: mockStart,
        commit: mockCommit,
        abort: mockAbort
    };
});

export default mock;
