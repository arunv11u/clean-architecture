import 'express-session';

declare module 'express-session' {
    export interface SessionData {
        auth: string;
        refresh: string;
    }
};