

export interface AuthRepository {
    guestLogin(): Promise<void>;
};