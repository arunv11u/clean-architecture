
export interface FormattedError {
    errors: ErrorObject[];
};


export interface ErrorObject {
    message: string;
    field?: string;
};


export interface BaseGenericError {
    error: Error;
    errorCode: number;
};
