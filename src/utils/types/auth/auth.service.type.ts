import { Response, NextFunction } from 'express';
import { TypedRequest } from '../common';
import { AuthDTO } from './auth.dto.type';

export interface AuthService {
    register(request: TypedRequest<{}, {}, AuthDTO.Register>, response: Response, next: NextFunction): void;
    guestLogin(request: TypedRequest<{}, {}, AuthDTO.GuestLogin>, response: Response, next: NextFunction): void;
};
