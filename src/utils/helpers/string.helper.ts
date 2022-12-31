import { GenericError } from "../errors";
import { StringHelper } from "../types";

export class StringHelperImpl implements StringHelper {

    constructor() { };

    trimString(input: string): string {
        if (!input || (typeof input !== "string")) throw new GenericError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

        return input.trim();
    };

    camelToTitleCase(input: string): string {
        if (!input || (typeof input !== "string")) throw new GenericError({ error: new Error("Input data is invalid, expected a string"), errorCode: 500 });

        const result = input.replace(/([A-Z])/g, " $1");
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

        return finalResult;
    };
};
