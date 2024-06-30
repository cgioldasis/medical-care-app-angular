
export interface Treatment {
    id: number;
    treatmentName: string;
    doctrorSsid: string;
    patientSsid: string;
    startDate: string;
    endDate: string;
    medicineNames: string[]; 
}

export interface AddTreatment {
    treatmentName: string;
    patientSsid: string;
    startDate: string;
    endDate: string;
    medicineNames: string[]; 
}

export interface UpdateTreatment {
    id: number;
    treatmentName: string;
    patientSsid: string;
    startDate: string;
    endDate: string;
    medicineNames: string[]; 
}

