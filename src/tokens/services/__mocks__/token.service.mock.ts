

export const mockUser = jest.fn();
export const mockVerify = jest.fn();
export const mockRefreshUser = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        user: mockUser,
        verify: mockVerify,
        refreshUser: mockRefreshUser
    };
});

export default mock;