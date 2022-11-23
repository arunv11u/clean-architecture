
export interface BaseNumberValidation {
    checkNumMaxVal(inputData: number, maxValue: number): boolean;
    checkNumMinVal(inputData: number, minValue: number): boolean;
};
