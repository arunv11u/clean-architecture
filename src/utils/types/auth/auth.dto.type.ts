
interface UserPhone {
  code: string;
  number: string;
};

export namespace AuthDTO {

  export interface GuestLogin {
    name: string;
    email?: string;
    phone: UserPhone;
  };
};
