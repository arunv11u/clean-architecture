import path from 'path';
import { GenericError } from '../errors';

const mergePath = (paths: string[]): string => {
    if (!paths) throw new GenericError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 });
    if (paths.constructor !== Array) throw new GenericError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 });
    paths.forEach((path) => { if (typeof path !== "string") throw new GenericError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 }) })

    return path.join(...paths);
};

export {
    mergePath
};
