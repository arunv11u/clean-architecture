
export const mockMarkStolenRefreshTokensIfStolen = jest.fn();


const mock = jest.fn().mockImplementation(() => {
    return {
        markStolenRefreshTokensIfStolen: mockMarkStolenRefreshTokensIfStolen
    };
});

export default mock;
