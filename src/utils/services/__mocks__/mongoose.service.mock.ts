
export const mockSave = jest.fn();
export const mockFindOne = jest.fn();
export const mockAggregate = jest.fn();
export const mockUpdateOne = jest.fn();
export const mockUpdateMany = jest.fn();

const mock = jest.fn().mockImplementation(() => {
    return {
        save: mockSave,
        findOne: mockFindOne,
        aggregate: mockAggregate,
        updateOne: mockUpdateOne,
        updateMany: mockUpdateMany,
    };
});

export default mock;