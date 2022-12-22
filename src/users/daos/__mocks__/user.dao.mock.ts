

export const mockSave = jest.fn();
export const mockCheckUserExists = jest.fn();
export const mockFindById = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        save: mockSave,
        checkUserExists: mockCheckUserExists,
        findById: mockFindById
    };
});

export default mock;