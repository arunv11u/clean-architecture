

export const mockGuestLogin = jest.fn();
export const mockLogout =jest.fn();


const mock = jest.fn().mockImplementation(() => {
    return {
        guestLogin: mockGuestLogin,
        logout: mockLogout
    };
});

export default mock;
