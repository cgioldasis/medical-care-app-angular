import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddPatient, Patient, UpdatePatient } from '../interface/patient'; 
import { environment } from 'src/environments/environment';

const API_URL = `${environment.apiURL}/api/patient`;

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${API_URL}/all`,{
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  addPatient(patient: AddPatient): Observable<AddPatient> {
    return this.http.post<AddPatient>(`${API_URL}/register`, patient, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  updatePatient(patient: UpdatePatient): Observable<UpdatePatient> {
    return this.http.put<UpdatePatient>(`${API_URL}/update/${patient.id}`, patient, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }

  getPatientByDoctorUsername(doctorUsername: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${API_URL}/doctor/${doctorUsername}`, {
      headers: {
        Authorization: ` ${localStorage.getItem('access_token')}`,
      }
    });
  }
}
