

export const mockSave = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        save: mockSave
    };
});

export default mock;