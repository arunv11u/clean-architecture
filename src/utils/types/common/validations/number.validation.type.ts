
export interface NumberValidation {
    checkNumMaxVal(inputData: number | undefined, maxValue: number): boolean;
    checkNumMinVal(inputData: number | undefined, minValue: number): boolean;
};
