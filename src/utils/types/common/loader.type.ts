import { Express } from 'express';
import { Server } from 'http';

export interface Loader {
    load(app: Express, server: Server): Promise<boolean>;
};
