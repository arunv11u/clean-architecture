
export const mockSave = jest.fn();
export const mockFindOne = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        save: mockSave,
        findOne: mockFindOne
    };
});

export default mock;