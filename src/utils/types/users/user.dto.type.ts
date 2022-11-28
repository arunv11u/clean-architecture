
interface UserPhone {
    code: string;
    number: string;
};

export namespace UserDTO {
    export interface CreateUser {
        name: string;
        email?: string;
        phone?: UserPhone;
    };
};
