import { GenericError } from "../errors";


const trimString = (inputData: string): string => {
    if (!inputData || (typeof inputData !== "string")) throw new GenericError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

    return inputData.trim();
};

export {
    trimString
};