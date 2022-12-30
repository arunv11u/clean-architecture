

export const mockSaveRefreshToken = jest.fn();
export const mockGetRefreshToken = jest.fn();
export const mockGetStolenRefreshTokenIds = jest.fn();
export const mockMarkStolenRefreshTokens = jest.fn();
export const mockSoftDeleteRefreshToken = jest.fn();


const mock = jest.fn().mockImplementation(() => {
    return {
        saveRefreshToken: mockSaveRefreshToken,
        getRefreshToken: mockGetRefreshToken,
        getStolenRefreshTokenIds: mockGetStolenRefreshTokenIds,
        markStolenRefreshTokens: mockMarkStolenRefreshTokens,
        softDeleteRefreshToken: mockSoftDeleteRefreshToken
    };
});

export default mock;