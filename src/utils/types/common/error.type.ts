
export interface FormattedError {
    errors: ErrorObject[];
};


export interface ErrorObject {
    message: string;
    field?: string;
};


export interface GenericErrorObject {
    error: Error;
    errorCode: number;
};
