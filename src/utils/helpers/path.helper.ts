import path from 'path';
import { GenericError } from '../errors';
import { BasePathHelper } from '../types';

export class PathHelper implements BasePathHelper {
    private static _instance: BasePathHelper;

    private constructor() { };

    static getInstance() {
        if (!PathHelper._instance) PathHelper._instance = new PathHelper();

        return PathHelper._instance;
    };

    mergePath(paths: string[]): string {
        if (!paths) throw new GenericError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 });
        if (paths.constructor !== Array) throw new GenericError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 });
        paths.forEach((path) => { if (typeof path !== "string") throw new GenericError({ error: new Error("Input data is invalid, expected an array of strings"), errorCode: 500 }) })

        return path.join(...paths);
    };
}; 
