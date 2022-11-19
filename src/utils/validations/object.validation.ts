import { GenericError } from "../errors";


const checkFieldExist = (inputData: Record<string, any>, field: string): boolean => {
    if (inputData.constructor.name !== "Object") throw new GenericError({ error: new Error("Input data is invalid, expected an object"), errorCode: 500 });

    return Object(inputData).hasOwnProperty(field);
};

const allowUndefinedField = (inputData: any): boolean => {
    return (inputData === undefined);
};

const allowFields = (inputData: Record<string, any>, fields: string[]) => {
    if (!inputData || (Object(inputData).constructor.name !== "Object")) throw new GenericError({ error: new Error("Input data is invalid, expected an object"), errorCode: 500 });
    if (!fields) throw new GenericError({ error: new Error("Fields input is invalid, expected an array of strings"), errorCode: 500 });
    fields.forEach((field) => {
        if (typeof field !== "string") throw new GenericError({ error: new Error("Fields input is invalid, expected an array of strings"), errorCode: 500 });
    });

    let forbiddenFields: string[] = [];
    for (let key in inputData)
        if (!fields.some((field) => field === key)) forbiddenFields.push(key);

    if (forbiddenFields.length) return false;

    return true;
};

export {
    checkFieldExist,
    allowUndefinedField,
    allowFields
};

