export interface Credentials {
    username: string;
    password: string;
}

export interface LoggedInUser {
    username: string;
    role: string;
}

export interface RegisterAdmin {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface UsersWithStatus {
    id : number;
    username: string;
    email: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}


export interface UpdateUserStatus {
    id: number;
    status: 'APPROVED' | 'REJECTED';
}
