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
    
