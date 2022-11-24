

interface BaseAuthRepository {
    guestLogin(): Promise<void>;
};

export {
    BaseAuthRepository
};