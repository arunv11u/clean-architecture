

export const mockOk = jest.fn();
export const mockCreated = jest.fn();
export const mockClientError = jest.fn();
export const mockUnauthorized = jest.fn();
export const mockPaymentRequired = jest.fn();
export const mockForbidden = jest.fn();
export const mockNotFound = jest.fn();
export const mockConflict = jest.fn();
export const mockTooManyRequests = jest.fn();
export const mockInternalError = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        ok: mockOk,
        created: mockCreated,
        clientError: mockClientError,
        unauthorized: mockUnauthorized,
        paymentRequired: mockPaymentRequired,
        forbidden: mockForbidden,
        notFound: mockNotFound,
        conflict: mockConflict,
        tooManyRequests: mockTooManyRequests,
        internalError: mockInternalError
    };
});

export default mock;
