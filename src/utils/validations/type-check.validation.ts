import { GenericError } from "../errors";

const checkFieldIsString = (inputData: string): boolean => {
    if (!inputData) throw new GenericError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

    return (typeof inputData === "string");
};

const checkFieldIsNumber = (inputData: number): boolean => {
    if (inputData !== 0 && !inputData) throw new GenericError({ error: new Error("Input data is invalid, expected a number"), errorCode: 500 });

    return (typeof inputData === "number");
};

const checkFieldIsBoolean = (inputData: boolean): boolean => {
    if (inputData !== false && !inputData) throw new GenericError({ error: new Error("Input data is invalid, expected a boolean"), errorCode: 500 });

    return (typeof inputData === "boolean");
};

const checkFieldIsObject = (inputData: Record<string, any>): boolean => {
    if (!inputData) throw new GenericError({ error: new Error("Input data is invalid, expected an object"), errorCode: 500 });

    return (Object(inputData).constructor.name === "Object");
};

const checkFieldIsArray = (inputData: Array<any>): boolean => {
    if (!inputData) throw new GenericError({ error: new Error("Input data is invalid, expected an array"), errorCode: 500 });

    return (Object(inputData).constructor.name === "Array");
};


export {
    checkFieldIsString,
    checkFieldIsNumber,
    checkFieldIsBoolean,
    checkFieldIsObject,
    checkFieldIsArray
};