export interface RegisterDoctor {
        username: string;
        password: string;
        confirmPassword: string;
        email: string;
        firstname: string;
        lastname: string;
        ssid: string;
        description: string;
        phone: string;
        specializationName: string;
}

export interface DoctorAccessedByAdmin {
        id: number;
        username: string;
        email: string;
        firstname: string;
        lastname: string;
        ssid: string;
        specializationName: string;
        phone: string;
}
