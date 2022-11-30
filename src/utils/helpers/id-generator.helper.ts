import { IdGeneratorHelper } from "../types";
import crypto from 'crypto';
import { GenericError } from "../errors";

export class IdGeneratorHelperImpl implements IdGeneratorHelper {

    constructor() { };

    async short8(): Promise<string> {
        let buf = Buffer.alloc(4);

        const promise = new Promise<string>((resolve, reject) => {
            crypto.randomFill(buf, (err, buf) => {
                if (err) return reject(new GenericError({ error: new Error("Short-8 Id generation faileds"), errorCode: 500 }));

                resolve(buf.toString('hex'));
            });
        });

        return promise;
    };
};
