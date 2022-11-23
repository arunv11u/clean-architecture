

export namespace AuthDTO {
  export interface Register {
    name: string;
    email: string;
    mobileNumber?: string;
    password: string;
  }

  export interface GuestLogin {
    name: string;
    email?: string;
    mobileNumber?: string;
  }
}
