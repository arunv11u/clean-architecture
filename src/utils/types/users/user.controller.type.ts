import { Response, NextFunction } from 'express';
import { UserDTO } from '../../dtos';
import { TypedRequest } from '../common';

interface BaseUserController {
    register(request: TypedRequest<{}, {}, UserDTO.Register>, response: Response, next: NextFunction): void;
};

export {
    BaseUserController
};
