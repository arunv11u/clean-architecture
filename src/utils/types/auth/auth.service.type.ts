import { Response, NextFunction } from 'express';
import { AuthDTO } from '../../dtos';
import { TypedRequest } from '../common';

interface BaseAuthService {
    register(request: TypedRequest<{}, {}, AuthDTO.Register>, response: Response, next: NextFunction): void;
    guestLogin(request: TypedRequest<{}, {}, AuthDTO.GuestLogin>, response: Response, next: NextFunction): void;
};

export {
    BaseAuthService
};
