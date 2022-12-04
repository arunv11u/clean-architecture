import unhandledError from "./unhandled-error-handler";
import { mockProcessExit } from "jest-mock-process";



describe(`"Unhandled Errors" Module`, () => {
  const mockExit = mockProcessExit();

  afterEach(() => {
    jest.restoreAllMocks();
  });


  it("should handle uncaughtException", () => {
    const mockError = new Error("Server internal error");
    jest.spyOn(process, "on").mockImplementation((event, handler): any => {
      if (event === "uncaughtException") handler(mockError);
    });
    jest.spyOn(console, "error").mockReturnValueOnce();

    unhandledError();

    expect(process.on).toBeCalledWith(
      "uncaughtException",
      expect.any(Function)
    );
    expect(mockExit).toBeCalledWith(1);
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
