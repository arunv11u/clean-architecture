

export const mockSave = jest.fn();
export const mockCheckUserExists = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        save: mockSave,
        checkUserExists: mockCheckUserExists
    };
});

export default mock;