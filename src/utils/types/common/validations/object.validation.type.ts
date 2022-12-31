
export interface ObjectValidation {
  checkFieldExist(input: Record<string, any>, field: string): boolean;
  allowUndefinedField(input: any): boolean;
  allowFields(input: Record<string, any>, fields: string[]): { isValid: boolean, message?: string };
}
