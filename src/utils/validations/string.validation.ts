import { GenericValidationError } from "../errors";

const checkStrMaxLen = (inputData: string, length: number): boolean => {
    if (!inputData || (typeof inputData !== "string")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });
    if (!length || (typeof length !== "number")) throw new GenericValidationError({ error: new Error("Maximum length input is invalid, expected a number"), errorCode: 500 });

    if (inputData.length <= length) return true;

    return false;
};

const checkStrMinLen = (inputData: string, length: number): boolean => {
    if (!inputData || (typeof inputData !== "string")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });
    if (!length || (typeof length !== "number")) throw new GenericValidationError({ error: new Error("Minimum length input is invalid, expected a number"), errorCode: 500 });

    if (inputData.length >= length) return true;

    return false;
};

const checkValidEmail = (inputData: string): boolean => {
    if (!inputData || (typeof inputData !== "string")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

    return !!String(inputData)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const allowEmptyStr = (inputData: string): boolean => {
    if ((inputData !== "" && !inputData) || (typeof inputData !== "string")) throw new GenericValidationError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

    return true;
};

export {
    checkStrMaxLen,
    checkStrMinLen,
    checkValidEmail,
    allowEmptyStr
};
