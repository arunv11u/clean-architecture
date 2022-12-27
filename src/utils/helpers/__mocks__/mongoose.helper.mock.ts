export const mockGetObjectId = jest.fn();


const mock = jest.fn().mockImplementation(() => {
    return {
        getObjectId: mockGetObjectId
    };
});

export default mock;
