import { GenericError } from "../errors";
import { BaseStringHelper } from "../types";

class StringHelper implements BaseStringHelper {
    private static _instance: BaseStringHelper;

    private constructor() { };

    static getInstance(): BaseStringHelper {
        if (!StringHelper._instance) StringHelper._instance = new StringHelper();

        return StringHelper._instance;
    };

    trimString(inputData: string): string {
        if (!inputData || (typeof inputData !== "string")) throw new GenericError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

        return inputData.trim();
    };

    camelToTitleCase(inputData: string): string {
        if (!inputData || (typeof inputData !== "string")) throw new GenericError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

        const result = inputData.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

        return finalResult;
    };
};

export {
    StringHelper
};