

export const mockUser = jest.fn();
export const mockVerify = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        user: mockUser,
        verify: mockVerify
    };
});

export default mock;