

export const mockGuestLogin = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        guestLogin: mockGuestLogin
    };
});

export default mock;
