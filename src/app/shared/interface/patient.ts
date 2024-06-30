export interface Patient {
    id: number;
    firstname: string;
    lastname: string;
    ssid: string;
    phone: string;
    gender: string;
    birthdate: Date;
    diseaseDescription: string;
}

export interface AddPatient {
    firstname: string;
    lastname: string;
    ssid: string;
    phone: string;
    gender: string;
    birthdate: Date;
    diseaseDescription: string;
}


export interface UpdatePatient {
    id: number;
    firstname: string;
    lastname: string;
    ssid: string;
    phone: string;
    gender: string;
    birthdate: Date;
    diseaseDescription: string;
}