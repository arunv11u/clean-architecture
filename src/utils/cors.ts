import { Environment } from "../utils";

export const corsOptions = function (req: any, callback: any) {
    const whitelist: string[] = [];

    if (process.env.NODE_ENV === Environment.PRODUCTION)
        whitelist.push();
    else if (process.env.NODE_ENV === Environment.STAGING)
        whitelist.push();
    else if (process.env.NODE_ENV === Environment.DEV)
        whitelist.push('http://localhost:4200');
    else if (process.env.NODE_ENV === Environment.TEST)
        whitelist.push('http://localhost:4200');

    let corsOptions = {
        origin: function (origin: any, callback: any) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        exposedHeaders: [],
    };
    callback(null, corsOptions);

    return true;
};
