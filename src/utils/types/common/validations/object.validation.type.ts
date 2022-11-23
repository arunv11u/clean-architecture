
export interface BaseObjectValidation {
  checkFieldExist(inputData: Record<string, any>, field: string): boolean;
  allowUndefinedField(inputData: any): boolean;
  allowFields(inputData: Record<string, any>, fields: string[]): boolean;
}
