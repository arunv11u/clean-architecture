
export const mockSetCookies = jest.fn();
export const mockSetSignedCookies = jest.fn();
export const mockGetCookies = jest.fn();
export const mockGetSignedCookies = jest.fn();
export const mockClear = jest.fn();


const mock = jest.fn().mockImplementation(() => {
    return {
        setCookies: mockSetCookies,
        setSignedCookies: mockSetSignedCookies,
        getCookies: mockGetCookies,
        getSignedCookies: mockGetSignedCookies,
        clear: mockClear
    };
});

export default mock;
