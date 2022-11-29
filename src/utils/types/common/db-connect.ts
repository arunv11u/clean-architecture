
export interface DbConnect {
    connect(connectionStr: string): Promise<boolean>;
};
