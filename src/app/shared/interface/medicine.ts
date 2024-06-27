export interface AddMedicine {
    medicineName: string;
    activeSubstance: string;
    manufacturer: string;
    manufactureDate: Date;
    expirationDate: Date;
}

export interface Medicine {
    id: number;
    medicineName: string;
    activeSubstance: string;
    manufacturer: string;
    manufactureDate: Date;
    expirationDate: Date;
}

export interface UpdateMedicine {
    id: number;
    medicineName: string;
    activeSubstance: string;
    manufacturer: string;
    manufactureDate: Date;
    expirationDate: Date;
}
