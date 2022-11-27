

export const mockGuestLogin = jest.fn().mockImplementation();

const mock = jest.fn().mockImplementation(() => {
    return {
        guestLogin: mockGuestLogin
    };
});

export default mock;
