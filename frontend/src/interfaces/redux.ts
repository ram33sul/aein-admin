export interface StateValue {
    admin: {
        data: AdminDataState | null
    }
}

export interface AdminDataState {
    id: String;
    iat: number;
    exp: number;
}