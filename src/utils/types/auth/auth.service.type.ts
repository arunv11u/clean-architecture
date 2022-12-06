import { Response, NextFunction } from 'express';
import { TypedRequest } from '../common';
import { AuthDTO } from './auth.dto.type';
import { AuthRO } from './auth.ro.type';

export interface AuthService {
    guestLogin(request: TypedRequest<{}, {}, AuthDTO.GuestLogin>, response: Response, next: NextFunction): Promise<AuthRO.GuestLogin>;
};
