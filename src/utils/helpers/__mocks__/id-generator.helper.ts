

export const mockShort8 = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        short8: mockShort8
    };
});

export default mock;
