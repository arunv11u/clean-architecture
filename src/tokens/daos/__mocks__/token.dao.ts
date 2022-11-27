

export const mockSave = jest.fn().mockImplementation();

const mock = jest.fn().mockImplementation(() => {
    return {
        save: mockSave
    };
});

export default mock;