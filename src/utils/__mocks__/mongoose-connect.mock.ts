

export const mockConnect = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        connect: mockConnect
    };
});

export default mock;
