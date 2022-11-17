import { GenericValidationError } from "../errors";

const checkArrMaxLen = (inputData: Array<any>, length: number) => {
    if (!inputData || (Object(inputData).constructor.name !== "Array")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array"), errorCode: 500 });
    if (!length || (typeof length !== "number")) throw new GenericValidationError({ error: new Error("Maximum length input is invalid, expected a number"), errorCode: 500 });

    return inputData.length <= length;
};

const checkArrMinLen = (inputData: Array<any>, length: number) => {
    if (!inputData || (Object(inputData).constructor.name !== "Array")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array"), errorCode: 500 });
    if (!length || (typeof length !== "number")) throw new GenericValidationError({ error: new Error("Minimum length input is invalid, expected a number"), errorCode: 500 });

    return inputData.length >= length;
};

const checkArrOfStr = (inputData: Array<string>) => {
    if (!inputData || (Object(inputData).constructor.name !== "Array")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 });

    for (let ele of inputData)
        if (typeof ele !== "string") throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 });

    return true;
};

const checkArrOfNum = (inputData: Array<number>) => {
    if (!inputData || (Object(inputData).constructor.name !== "Array")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array of numbers"), errorCode: 500 });

    for (let ele of inputData)
        if (typeof ele !== "number") throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array of numbers"), errorCode: 500 });

    return true;
};

const checkArrOfBool = (inputData: Array<boolean>) => {
    if (!inputData || (Object(inputData).constructor.name !== "Array")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array of booleans"), errorCode: 500 });

    for (let ele of inputData)
        if (typeof ele !== "boolean") throw new GenericValidationError({ error: new Error("Input data is invalid, expected an array of booleans"), errorCode: 500 });

    return true;
};

export {
    checkArrMaxLen,
    checkArrMinLen,
    checkArrOfStr,
    checkArrOfNum,
    checkArrOfBool
};