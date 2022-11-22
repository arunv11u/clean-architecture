import { Response, NextFunction } from 'express';
import { UserDTO } from '../../dtos';
import { TypedRequest } from '../common';

interface BaseUserController {
    sample(request: TypedRequest<{}, {}, {}>, response: Response, next: NextFunction): void;
};

export {
    BaseUserController
};
