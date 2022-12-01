
export const mockLoad = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        load: mockLoad
    };
});

export default mock;
