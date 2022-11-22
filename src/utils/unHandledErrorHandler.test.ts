import unhandledError from "./unHandledErrorHandler";

describe(`"Unhandled Errors" Module`, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Only run this test case after removing process.exit(1) from the unHandledErrorHandler module.
  // Make sure to undo the changes before commiting it to Version Control System(Git)
  it.skip("should handle uncaughtException", () => {
    const mockError = new Error("Server internal error");
    jest.spyOn(process, "on").mockImplementation((event, handler): any => {
      if (event === "uncaughtException") handler(mockError);
    });
    jest.spyOn(console, "error").mockReturnValueOnce();
    jest.spyOn(process, "exit");

    unhandledError();

    expect(process.on).toBeCalledWith(
      "uncaughtException",
      expect.any(Function)
    );
    expect(process.exit).toBeCalledWith(1);
    expect(console.error).toBeCalledWith("Server internal error");
  });

  it("should handle unhandledRejection", () => {
    const mockError = new Error("Sample unhandled Promise rejection");
    jest.spyOn(process, "on").mockImplementation((event, handler): any => {
      if (event === "unhandledRejection") handler(mockError);
    });

    expect(() => unhandledError()).toThrowError("Sample unhandled Promise rejection");
    expect(process.on).toBeCalledWith(
      "unhandledRejection",
      expect.any(Function)
    );
  });
});
