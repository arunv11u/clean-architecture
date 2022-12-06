

export const mockGenerateUserId = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        generateUserId: mockGenerateUserId
    };
});

export default mock;