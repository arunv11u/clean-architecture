

export namespace AuthDTO {
  export interface Register {
    name: string;
    email: string;
    mobileNumber?: string;
    password: string;
  }
}
